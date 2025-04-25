import {
  HumanMessage,
  RemoveMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { END, START, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { chatModel, chatModelWithoutStreaming } from './openai';
import {
  extendSummarizeConversationPrompt,
  summarizeConversationPrompt,
  systemPromptForAgentWithoutSummary,
  systemPromptForAgentWithSummary,
} from './prompts';
import { AgentState, AgentStateType } from './state';
import { tools } from './tool';
import { isToolCallingMessage } from './utils';

const agent = async (state: AgentStateType) => {
  const { summary } = state

  const chatModelWithTools = chatModel.bindTools(tools)

  let systemPrompt: string
  if (summary && summary.length > 0) {
    systemPrompt = await systemPromptForAgentWithSummary.format({ summary })
  } else {
    systemPrompt = systemPromptForAgentWithoutSummary
  }

  const messages = [new SystemMessage(systemPrompt), ...state.messages]

  const response = await chatModelWithTools.invoke(messages)

  return {
    messages: [response],
  }
}

const summarizeConversation = async (state: AgentStateType) => {
  const { summary, messages } = state

  let prompt: string
  if (summary) {
    prompt = await extendSummarizeConversationPrompt.format({ summary })
  } else {
    prompt = summarizeConversationPrompt
  }

  const messagesWithoutToolMessage = messages.filter((message) => {
    if (isToolCallingMessage(message)) {
      return false
    }
    if (message.getType() === 'tool') {
      return false
    }
    return true
  })

  const response = await chatModelWithoutStreaming.invoke([
    ...messagesWithoutToolMessage,
    new HumanMessage(prompt),
  ])

  const lastMessages = messagesWithoutToolMessage.slice(-2)

  const oldMessages = messages.filter(
    (message) =>
      !lastMessages.some((lastMessage) => lastMessage.id === message.id)
  )

  const newMessages = oldMessages.map(
    (message, index) =>
      new RemoveMessage({ id: message.id ?? index.toString() })
  )

  return {
    summary: response.content as string,
    messages: [...newMessages, ...lastMessages],
  }
}

const toolNode = new ToolNode(tools)

const nextNode = (
  state: AgentStateType
): 'tools' | 'summarizeConversation' | typeof END => {
  const message = state.messages[state.messages.length - 1]

  if (isToolCallingMessage(message)) {
    return 'tools'
  }

  if (state.messages.length > 6) {
    return 'summarizeConversation'
  }

  return END
}

const builder = new StateGraph(AgentState)
  .addNode('agent', agent)
  .addNode('summarizeConversation', summarizeConversation)
  .addNode('tools', toolNode)

  .addEdge(START, 'agent')
  .addEdge('tools', 'agent')
  .addConditionalEdges('agent', nextNode)
  .addEdge('summarizeConversation', END)

export const graph = builder.compile()