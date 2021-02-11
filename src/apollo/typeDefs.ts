import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # DNSRecord returns data specific to a domain name
  type DnsRecord {
    createdDate: String!
    updatedDate: String!
    domainName: String!
    dnsRecords: [DnsRecordDetails]!
    rawData: String!
  }

  type DnsRecordDetails {
    type: Int!
    dnsType: String!
    name: String!
    ttl: Int!
    rRsetType: Int!
    strings: [String]!
  }

  # type IPRecord returns data specific to an IP address
  type IPRecord {
    connectionType: String!
    domains: [String]!
    ip: String!
    isp: String!
    location: IPGeoLocation!
    rawData: String!
  }

  type IPGeoLocation {
    country: String!
    region: String!
    city: String!
    lat: Float
    lng: Float
    postalCode: String!
    timezone: String!
    geonameId: ID!
  }

  # type WhoIsRecord returns WhoIs data for IP or domain name
  type WhoIsRecord {
    createdDate: String!
    updatedDate: String!
    expiresDate: String!
    registrant: WhoIsContact!
    administrativeContact: WhoIsContact!
    technicalContact: WhoIsContact!
    domainName: String!
    nameServers: WhoIsNameServer!
    registrarName: String!
    domainAvailability: String!
    contactEmail: String!
    domainNameExt: String!
    estimatedDomainAge: Int!
    ips: [String]!
    rawData: String!
  }

  type WhoIsContact {
    organization: String!
    state: String!
    country: String!
    countryCode: String!
  }

  type WhoIsNameServer {
    rawText: String!
    hostNames: [String]!
    ips: [String]!
  }

  type Query {
    dnsRecord(domain: String!): DnsRecord!

    ipRecord(ip: String!): IPRecord!

    whoisRecord(domain: String!): WhoIsRecord!
  }
`;
