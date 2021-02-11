export type DomainName = string;

export type DnsRecordDetails = {
  type: number;
  dnsType: string;
  name: string;
  ttl: number;
  rRsetType: number;
  strings: [string];
};

export type DnsRecord = {
  createdDate: string;
  updatedDate: string;
  domainName: string;
  dnsRecords: DnsRecordDetails[];
  rawData: string;
};
