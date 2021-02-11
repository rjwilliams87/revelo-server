import { ApolloServer } from 'apollo-server-express';

import { createAppDataSources } from './datasources';
import { createAppResolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const createApolloServer = (): ApolloServer => {
  const server = new ApolloServer({
    dataSources: createAppDataSources,
    resolvers: createAppResolvers(),
    typeDefs,
  });

  return server;
};
