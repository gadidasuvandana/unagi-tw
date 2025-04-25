import { createRetrieverTool } from 'langchain/tools/retriever';
import { TOP_K_EMBEDDING_TO_BE_RETRIEVED } from './constants';
import { getVectorStore } from './vectorstore';

const vectorStore = await getVectorStore()

const retriever = vectorStore.asRetriever({
  k: TOP_K_EMBEDDING_TO_BE_RETRIEVED,
})

const retrieverTool = createRetrieverTool(retriever, {
  name: 'retriever_project_details',
  description:
    'Useful for when you need to answer questions about the project.',
})

export const tools = [retrieverTool]