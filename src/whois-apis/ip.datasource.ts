import { RESTDataSource } from 'apollo-datasource-rest';

const WHOIS_API_KEY = process.env.WHOIS_API_KEY;
const WHOIS_IP_GEO_URL = 'https://ip-geolocation.whoisxmlapi.com/api';

export default class IPDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = WHOIS_IP_GEO_URL;
  }

  public async fetchIpData(ip: string): Promise<Record<string, unknown>> {
    const endpoint = `v1?apiKey=${WHOIS_API_KEY}&ipAddress=${ip}&outputFormat=JSON`;
    const result = await this.get(endpoint);
    return result;
  }
}
