import { BaseMessage } from '@langchain/core/messages';

export const isToolCallingMessage = (message: BaseMessage) => {
  return (
    'tool_calls' in message &&
    Array.isArray(message.tool_calls) &&
    message.tool_calls.length > 0
  )
}