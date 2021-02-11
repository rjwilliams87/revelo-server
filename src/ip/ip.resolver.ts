import { ApolloError } from 'apollo-server-express';
import { applySpec, identity, pipe, propOr } from 'ramda';

import { AppContext } from '../apollo/apollo.types';
import { IP, IPGeoLocation, IPRecord } from './ip.types';

const geoSpec = applySpec<IPGeoLocation>({
  country: propOr('', 'country'),
  region: propOr('', 'region'),
  city: propOr('', 'city'),
  lat: propOr(null, 'lat'),
  lng: propOr(null, 'lng'),
  postalCode: propOr('', 'postalCode'),
  timezone: propOr('', 'timezone'),
  geonameId: propOr('', 'geonameId'),
});

const ipSpec = applySpec<IPRecord>({
  connectionType: propOr<string>('', 'connectionType'),
  domains: propOr<[] | undefined>([], 'domains'),
  ip: propOr<string>('', 'ip'),
  isp: propOr<string>('', 'isp'),
  location: pipe(propOr({}, 'location'), geoSpec),
  rawData: pipe(identity, JSON.stringify),
});

export const buildIPRecord = (rawData: Record<string, unknown>): IPRecord => {
  const ipRecord: IPRecord = ipSpec(rawData);
  return ipRecord;
};

const Query = {
  async ipRecord(root: any, args: { ip: IP }, context: AppContext, info: any): Promise<IPRecord> {
    try {
      const { ip } = args;
      const rawData: Record<string, unknown> = await context.dataSources?.ip?.fetchIpData(ip);
      return buildIPRecord(rawData);
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

export const resolver = { Query };
