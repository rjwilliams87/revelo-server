export type DomainName = string;

export type DomainRecord = {
  type: number;
  dnsType: string;
  name: string;
  ttl: number;
  rRsetType: number;
  rawText: string;
  strings: [string];
};

export type DNSRecord = {
  createdDate: string;
  updatedDate: string;
  domainName: string;
  dnsRecords: [DomainRecord];
  rawData: string;
};
