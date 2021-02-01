import { ApolloServer } from 'apollo-server-express';

import { createAppDataSources as dataSources } from './datasources';
import { createAppResolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const createApolloServer = (): ApolloServer => {
  const resolvers = createAppResolvers();

  const server = new ApolloServer({
    dataSources,
    resolvers,
    typeDefs,
  });

  return server;
};
