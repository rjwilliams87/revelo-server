export type WhoIsRecord = {
  administrativeContact: WhoIsContact;
  contactEmail: string;
  createdDate: string;
  domainAvailability: string;
  domainName: string;
  domainNameExt: string;
  estimatedDomainAge?: number;
  expiresDate: string;
  ips: string[];
  nameServers: WhoIsNameServer;
  registrant: WhoIsContact;
  registrarName: string;
  technicalContact: WhoIsContact;
  rawData: string;
  updatedDate: string;
};

export type WhoIsContact = {
  country: string;
  countryCode: string;
  organization: string;
  state: string;
};

export type WhoIsNameServer = {
  hostNames: string[];
  ips: string[];
};
