import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from 'graphql-tools';

import { resolver as DnsResolver } from '../dns/dns.resolver';

const resolvers = [DnsResolver];

export function createAppResolvers(): IResolvers<any, any> {
  return mergeResolvers(resolvers);
}
