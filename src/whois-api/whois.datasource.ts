import { RESTDataSource } from 'apollo-datasource-rest';

const WHOIS_API_KEY = process.env.WHOIS_API_KEY;
const WHOIS_API_URL = process.env.WHOIS_API_URL;
const WHOIS_SERVICE_ENDPOINT = process.env.WHOIS_SERVICE_ENDPOINT;
const WHOIS_DNS_ENDPOINT = process.env.WHOIS_DNS_ENDPOINT;

export default class WHOISDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = WHOIS_API_URL;
  }

  public async fetchDnsData(name: string): Promise<Record<string, any>> {
    const endpoint = `${WHOIS_DNS_ENDPOINT}?apiKey=${WHOIS_API_KEY}&domainName=${name}&outputFormat=JSON&type=_all`;
    const result = await this.get(endpoint);
    return result;
  }

  public async fetchWhoIsData(name: string): Promise<Record<string, any>> {
    const endpoint = `${WHOIS_SERVICE_ENDPOINT}?apiKey=${WHOIS_API_KEY}&domainName=${name}&outputFormat=JSON`;
    const result = await this.get(endpoint);
    return result;
  }
}
