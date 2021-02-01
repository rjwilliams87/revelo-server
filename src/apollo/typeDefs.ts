import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # DNSRecord returns data specific to a domain name
  type DNSRecord {
    createdDate: String!
    updatedDate: String!
    domainName: String!
    dnsRecords: [DomainRecord]!
    rawData: String!
  }

  type DomainRecord {
    type: Int!
    dnsType: String!
    name: String!
    ttl: Int!
    rRsetType: Int!
    rawText: String!
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
    rawData: String!
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

  type Query {
    dnsRecord(domain: String!): DNSRecord!

    ipRecord(ip: String!): IPRecord!

    whoisRecord(domain: String!): WHOISRecord!
  }
`;
