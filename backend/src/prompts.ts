import { PromptTemplate } from '@langchain/core/prompts';

export const summarizeConversationPrompt =
  'Create a summary of the conversation above but only include the most important information and exclude any greetings or other non-important information'

export const extendSummarizeConversationPrompt = PromptTemplate.fromTemplate(
  `This is a summary of the conversation to date: {summary}\n\n` +
    'Extend the summary by taking into account the new messages above but only include the most important information and exclude any greetings or other non-important information'
)

export const systemPromptForAgentWithoutSummary =
  'You are AI Docs, a helpful assistant that helps the developer with their questions from technical documentations. You are giving tool to retrieve the information from the documentation of these technologies: Next.js.'

export const systemPromptForAgentWithSummary = PromptTemplate.fromTemplate(
  'You are AI Docs, a helpful assistant that helps the developer with their questions from technical documentations. You are giving tool to retrieve the information from the documentation of these technologies: Next.js. Here is the summary of the conversation to date: {summary}'
)