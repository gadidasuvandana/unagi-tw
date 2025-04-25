import dotenv from 'dotenv';

dotenv.config()

export const configuration = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    embeddingsModel: 'text-embedding-ada-002',
    llmModel: 'gpt-4o-mini',
  },
  database: {
    postgresConnectionOptions: {
      type: 'postgres',
      user: 'user',
      password: "password",
      host:"localhost",
      port: 5432,
      database: 'db',
      ssl: false,
    },
    dimensions: 1536,
    tableName: 'langchain_pg_embedding',
    collectionTableName: 'langchain_pg_collection',
    collectionName: 'documentation',
    columns: {
      idColumnName: 'id',
      vectorColumnName: 'embedding',
      contentColumnName: 'document',
      metadataColumnName: 'cmetadata',
    },
  },
}

export type ConfigurationType = typeof configuration