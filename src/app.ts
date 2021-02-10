import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import { createApolloServer } from './apollo/server';

export default async function main({
  path,
}: {
  path: string;
}): Promise<{
  app: any;
  server: ApolloServer;
}> {
  const server = await createApolloServer();

  const app = express();

  app.use(cors());

  server.applyMiddleware({ app, path });

  return { app, server };
}
