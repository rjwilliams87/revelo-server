import { DataSource } from 'apollo-datasource';

import { AppContext } from './types';
import IPDataSource from '../whois-api/ip.datasource';
import WHOISDataSource from '../whois-api/whois.datasource';

export const createAppDataSources = (): Record<string, DataSource<AppContext>> => {
  const dataSources = {
    ip: new IPDataSource(),
    whois: new WHOISDataSource(),
  };

  return dataSources;
};
