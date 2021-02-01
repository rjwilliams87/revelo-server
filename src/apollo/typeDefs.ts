import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # type Record returns all possible values for ip or domain
  type Record {
    dns: DNSRecord!
    ip: IPRecord!
    whois: WHOISRecord!
  }

  # type IPRecord returns data specific to an IP address
  type IPRecord {
    connectionType: String!
    domains: [String]!
    ip: String!
    isp: String!
    location: IPGeoLocation!
    rawdata: String!
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

  # DNSRecord returns data specific to a domain name
  type DNSRecord {
    createdDate: String!
    updatedDate: String!
    domainName: String!
    dnsTypes: String!
    dnsRecord: [DomainRecord]!
    rawdata: String!
    types: [Number]!
  }

  type DomainRecord {
    type: Number!
    dnsType: String!
    name: String!
    ttl: Number!
    rRsetType: Number!
    rawText: String!
    strings: [String]!
  }

  # type WHOISRecord returns WHOIS data for IP or domain name
  type WHOISRecord {
    createdDate: String!
    updatedDate: String!
    expiresDate: String!
    registrant: WHOISContact!
    administrativeContact: WHOISContact!
    technicalContact: WHOISContact!
    domainName: String!
    nameServers: WHOISNameServer!
    registrarName: String!
    domainAvailability: String!
    contactEmail: String!
    domainNameExt: String!
    estimatedDomainAge: Int!
    ips: [String]!
    rawdata: String!
  }

  type WHOISContact {
    organization: String!
    state: String!
    country: String!
    countryCode: String!
    rawText: String!
  }

  type WHOISNameServer {
    rawText: String!
    hostNames: [String]!
    ips: [String]!
  }

  extend type Query {
    DNSRecord(domainRef: String!): DNSRecord!

    IPRecord(ipRef: String!): IPRecord!

    Record(type: String!, recordRef: String!): Record!

    WHOISRecord(recordRef: String!): WHOISRecord!
  }
`;
