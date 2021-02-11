import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express, { Application } from 'express';

import { createApolloServer } from './apollo/server';

const API_PATH = '/graphql';
export default async function main(
  path: string = API_PATH,
): Promise<{
  app: Application;
}> {
  const server: ApolloServer = await createApolloServer();

  const app: Application = express();

  app.use(cors());

  server.applyMiddleware({ app, path });

  return { app };
}
