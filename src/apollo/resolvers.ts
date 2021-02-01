import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from 'graphql-tools';

const resolvers = [];

export function createAppResolvers(): IResolvers<any, any> {
  return mergeResolvers(resolvers);
}
