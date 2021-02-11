import { ApolloError } from 'apollo-server-express';
import { applySpec, identity, pipe, propOr } from 'ramda';

import { AppContext } from '../apollo/apollo.types';
import { WhoIsRecord, WhoIsContact, WhoIsNameServer } from './whois.types';

const whoisContactSpec = applySpec<WhoIsContact>({
  country: propOr<string>('', 'country'),
  countryCode: propOr<string>('', 'countryCode'),
  organization: propOr<string>('', 'organization'),
  state: propOr<string>('', 'state'),
});

const whoisNameServerSpec = applySpec<WhoIsNameServer>({
  hostNames: propOr<[]>([], 'hostNames'),
  ips: propOr<[]>([], 'ips'),
});

const whoisSpec = applySpec<WhoIsRecord>({
  administrativeContact: pipe(
    propOr<Record<string, unknown>>({}, 'administrativeContact'),
    whoisContactSpec,
  ),
  contactEmail: propOr<string>('', 'contactEmail'),
  createdDate: propOr<string>('', 'createdDate'),
  domainAvailability: propOr<string>('', 'domainAvailability'),
  domainName: propOr<string>('', 'domainName'),
  domainNameExt: propOr<string>('', 'domainNameExt'),
  estimatedDomainAge: propOr<number | null>(null, 'estimatedDomainAge'),
  expiresDate: propOr<string>('', 'expiresDate'),
  ips: propOr<[]>([], 'domainNameExt'),
  nameServers: pipe(propOr<Record<string, unknown>>({}, 'nameServers'), whoisNameServerSpec),
  rawData: pipe(identity, JSON.stringify),
  registrant: pipe(propOr<Record<string, unknown>>({}, 'registrant'), whoisContactSpec),
  registrarName: propOr<string>('', 'registrarName'),
  technicalContact: pipe(propOr<Record<string, unknown>>({}, 'technicalContact'), whoisContactSpec),
  updatedDate: propOr<string>('', 'updatedDate'),
});

export const buildWhoIsRecord = (rawData: Record<string, unknown>): WhoIsRecord => {
  const record: WhoIsRecord = whoisSpec(rawData);
  return record;
};

const Query = {
  async whoisRecord(
    root: any,
    args: { domain: string },
    context: AppContext,
    info: any,
  ): Promise<WhoIsRecord> {
    try {
      const { domain } = args;
      const data: Record<string, any> = await context.dataSources?.whois?.fetchWhoIsData(domain);
      const { WhoisRecord } = data;
      return buildWhoIsRecord(WhoisRecord);
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

export const resolver = { Query };
