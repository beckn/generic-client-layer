import { injectable } from 'inversify';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

@injectable()
export class ConfigService {
    private readonly apiKey: string;
    private readonly appName;
    private readonly appEnv;
    private readonly appKey;
    private readonly appDebug;
    private readonly appPort;
    private readonly appUrl;
    private readonly psBaseUri;
    private readonly psBapId;
    private readonly psBapUri;
    private readonly psCityName;
    private readonly psCityCode;
    private readonly psCountryName;
    private readonly psCountryCode;


    constructor() {
        // Load environment variables from .env file
        dotenv.config();

        // Retrieve the API_KEY from environment variables
        this.apiKey = process.env.APP_KEY || '';
        this.appName = process.env.APP_NAME || '';
        this.appEnv = process.env.APP_ENV || '';
        this.appKey = process.env.APP_KEY || '';
        this.appDebug = process.env.APP_DEBUG || '';
        this.appPort = process.env.APP_PORT || '';
        this.appUrl = process.env.APP_URL || '';
        this.psBaseUri = process.env.PS_BASE_URI || '';
        this.psBapId = process.env.PS_BAP_ID || '';
        this.psBapUri = process.env.PS_BAP_URI || '';
        this.psCityName = process.env.PS_CITY_NAME || '';
        this.psCityCode = process.env.PS_CITY_CODE || '';
        this.psCountryName = process.env.PS_COUNTRY_NAME || '';
        this.psCountryCode = process.env.PS_COUNTRY_CODE || '';
    }

    getApiKey(): string {
        return this.apiKey;
    }

    getAppName(): string {
        return this.appName;
    };

    getAppEnv(): string {
        return this.appEnv;
    };

    getAppKey(): string {
        return this.appKey;
    };

    getAppDebug(): string {
        return this.appDebug;
    };

    getAppPort(): string {
        return this.appPort;
    };

    getAppUrl(): string {
        return this.appUrl;
    };

    getPsBaseUri(): string {
        return this.psBaseUri;
    };

    getPsBapId(): string {
        return this.psBapId;
    };

    getPsBapUri(): string {
        return this.psBapUri;
    };

    getPsCityName(): string {
        return this.psCityName;
    };

    getPsCityCode(): string {
        return this.psCityCode;
    };

    getPsCountryName(): string {
        return this.psCountryName;
    };

    getPsCountryCode(): string {
        return this.psCountryCode;
    };

}
