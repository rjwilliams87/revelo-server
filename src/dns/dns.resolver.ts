import { ApolloError } from 'apollo-server-express';
import { applySpec, identity, pipe, propOr } from 'ramda';

import { AppContext } from '../apollo/types';

export interface DnsArgs {
  domain: string;
}

interface DomainRecord {
  type: number;
  dnsType: string;
  name: string;
  ttl: number;
  rRsetType: number;
  rawText: string;
  strings: [string];
}

interface DNSRecord {
  createdDate: string;
  updatedDate: string;
  domainName: string;
  dnsRecords: [DomainRecord];
  rawData: string;
}

const dnsSpec = applySpec({
  createdDate: propOr('', 'createdDate'),
  updatedDate: propOr('', 'createdDate'),
  domainName: propOr('', 'domainName'),
  dnsRecords: propOr([], 'dnsRecords'),
  rawData: pipe(identity, JSON.stringify),
});

export const buildDnsRecord = (rawData: Record<string, unknown>) => {
  const dnsRecord = dnsSpec(rawData);
  return dnsRecord;
};

const Query = {
  async dnsRecord(root: any, args: DnsArgs, context: AppContext, info: any) {
    try {
      console.log('args = ', args);
      const { domain } = args;
      const { DNSData } = await context?.dataSources?.whois?.fetchDnsData(domain);
      console.log('result = ', DNSData);
      return buildDnsRecord(DNSData);
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

export const resolver = { Query };
