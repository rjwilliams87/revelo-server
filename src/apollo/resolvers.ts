import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from 'graphql-tools';

import { resolver as DnsResolver } from '../dns/dns.resolver';
import { resolver as IPResolver } from '../ip/ip.resolver';

const resolvers = [DnsResolver, IPResolver];

export function createAppResolvers(): IResolvers<any, any> {
  return mergeResolvers(resolvers);
}
