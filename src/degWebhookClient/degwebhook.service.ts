import { inject, injectable } from "inversify";
import { ConfigService } from "../config/config.service";
import HttpClient from "../httpclient/http.service";

@injectable()
export class DEGWebhookService {
    private degWebhookUri: string;

    constructor(
        @inject(ConfigService) private config: ConfigService,
        @inject(HttpClient) private httpClient: HttpClient
    ) {
        this.degWebhookUri = this.config.getDegWebhookUri()
    }


    private postPromise(payload: any): Promise<any> {
        return this.httpClient.post(this.degWebhookUri, payload)
    }

    async post(payload: any): Promise<any> {
        if (!this.degWebhookUri) {
            throw new Error('Unsolicited Request, No BAP Webhook URI found, Dropping Request...');
        }
        const response = await this.postPromise(payload);
        return response;
    }

    async postMany(payloads: any[]): Promise<any> {
        if (!this.degWebhookUri) {
            throw new Error('Unsolicited Request, No BAP Webhook URI found, Dropping Request...');
        }
        return await Promise.all(payloads.map((payload: any) =>
            this.postPromise(payload)
        ));
    }
}
