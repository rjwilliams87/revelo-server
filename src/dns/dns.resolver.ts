import { ApolloError } from 'apollo-server-express';
import { applySpec, identity, pipe, propOr } from 'ramda';

import { AppContext } from '../apollo/apollo.types';
import { DnsRecordDetails, DnsRecord } from './dns.types';

const dnsSpec = applySpec<DnsRecord>({
  createdDate: propOr('', 'createdDate'),
  updatedDate: propOr('', 'createdDate'),
  domainName: propOr('', 'domainName'),
  dnsRecords: propOr<DnsRecordDetails[]>([], 'dnsRecords'),
  rawData: pipe(identity, JSON.stringify),
});

export const buildDnsRecord = (rawData: Record<string, unknown>): DnsRecord => {
  const dnsRecord = dnsSpec(rawData);
  return dnsRecord;
};

const Query = {
  async dnsRecord(
    root: any,
    args: { domain: string },
    context: AppContext,
    info: any,
  ): Promise<DnsRecord> {
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
