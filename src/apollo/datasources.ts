import { DataSource } from 'apollo-datasource';

import { AppContext } from './apollo.types';
import IPDataSource from '../whois-apis/ip.datasource';
import WHOISDataSource from '../whois-apis/whois.datasource';

export const createAppDataSources = (): Record<string, DataSource<AppContext>> => {
  const dataSources = {
    ip: new IPDataSource(),
    whois: new WHOISDataSource(),
  };

  return dataSources;
};
