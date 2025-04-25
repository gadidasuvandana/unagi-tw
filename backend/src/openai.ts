import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { configuration } from './configurations';
import { LLM_TEMPERATURE } from './constants';

export const embeddings = new OpenAIEmbeddings({
  model: configuration.openai.embeddingsModel,
})

export const chatModel = new ChatOpenAI({
  model: configuration.openai.llmModel,
  temperature: LLM_TEMPERATURE,
  streaming: true,
})

export const chatModelWithoutStreaming = new ChatOpenAI({
  model: configuration.openai.llmModel,
  temperature: LLM_TEMPERATURE,
  streaming: false,
})