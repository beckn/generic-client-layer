import { IRequestContext, requestContextSchema } from "./schemaValidator";

export interface IContextStructure_ver_1_1_0 {
  domain: string;
  location: {
    id?: string;
    descriptor?: {
      name?: string;
      code?: string;
      short_desc?: string;
      long_desc?: string;
      additional_desc?: {
        url?: string;
        content_type?: "text/plain";
      };
      media?: [
        {
          mimetype?: string;
          url?: string;
          signature?: string;
          dsa?: string;
        }
      ];
      images?: [
        {
          url?: string;
          size_type?: string;
          width?: string;
          height?: string;
        }
      ];
    };
    map_url?: string;
    gps?: string;
    address?: string;
    city?: {
      name?: string;
      code?: string;
    };
    district?: string;
    state?: {
      name?: string;
      code?: string;
    };
    country?: {
      name?: string;
      code?: string;
    };
    area_code?: string;
    circle?: {
      gps?: string;
      radius?: {
        type?: string;
        value?: string;
        estimated_value?: string;
        computed_value?: string;
        range?: {
          min?: string;
          max?: string;
        };
        unit?: string;
      };
    };
    polygon?: string;
    rating?: string;
  };
  action: string;
  version: string;
  bap_id: string;
  bap_uri: string;
  bpp_id?: string;
  bpp_uri?: string;
  transaction_id: string;
  message_id: string;
  timestamp?: string;
  key?: string;
  ttl?: string;
}

export const buildRequestContextVer1_1_0 = (
  input: IRequestContext,
  action: string
) => {
  const {
    bppId,
    bppUri,
    domain,
    messageId,
    transactionId,
    bapId,
    bapUri,
    key
  } = input;
  const context: IContextStructure_ver_1_1_0 = {
    domain: domain,
    bpp_id: bppId,
    bpp_uri: bppUri,
    bap_id: bapId || `${process.env.BAP_ID}`,
    action: action,
    bap_uri: bapUri || `${process.env.BAP_URI}`,
    version: "1.1.0",
    transaction_id: transactionId,
    message_id: messageId,
    location: {
      country: {
        name: `${process.env.COUNTRY_NAME}`,
        code: `${process.env.COUNTRY_CODE}`
      },
      city: {
        name: `${process.env.CITY_NAME}`,
        code: `${process.env.CITY_CODE}`
      }
    },
    ttl: "PT10M",
    key: key,
    timestamp: `${new Date().toISOString()}`
  };
  return context;
};
