import { ApolloError } from 'apollo-server-express';
import { applySpec, identity, pipe, propOr } from 'ramda';

import { AppContext } from '../apollo/types';
import { DomainName, DNSRecord } from './dns.types';

const dnsSpec = applySpec<DNSRecord>({
  createdDate: propOr('', 'createdDate'),
  updatedDate: propOr('', 'createdDate'),
  domainName: propOr('', 'domainName'),
  dnsRecords: propOr([], 'dnsRecords'),
  rawData: pipe(identity, JSON.stringify),
});

export const buildDnsRecord = (rawData: Record<string, unknown>): DNSRecord => {
  const dnsRecord = dnsSpec(rawData);
  return dnsRecord;
};

const Query = {
  async dnsRecord(
    root: any,
    args: { domain: DomainName },
    context: AppContext,
    info: any,
  ): Promise<DNSRecord> {
    try {
      const { domain } = args;
      const { DNSData } = await context?.dataSources?.whois?.fetchDnsData(domain);

      return buildDnsRecord(DNSData);
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

export const resolver = { Query };
