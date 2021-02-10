export type IP = string;

export type IPGeoLocation = {
  country: string;
  region: string;
  lat?: number;
  lng?: number;
  postalCode: string;
  timezone: string;
  geonameId: string;
};

export type IPRecord = {
  connectionType: string;
  domains: string[];
  ip: string;
  isp: string;
  location: IPGeoLocation;
  rawData: string;
};
