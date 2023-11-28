import { inject, injectable } from "inversify";
import { ConfigService } from "../config/config.service";
import HttpClient from "../httpclient/http.service";

@injectable()
export class PSClientService {
    private psBaseUri: string;

    constructor(
        @inject(ConfigService) private config: ConfigService,
        @inject(HttpClient) private httpClient: HttpClient
    ) {
        this.psBaseUri = this.config.getPsBaseUri()
    }

    private buildUri(action: string) {
        return `${this.psBaseUri}/${action}`;
    }

    private postPromise(payload: any): Promise<any> {
        return this.httpClient.post(this.buildUri(payload.context.action), payload)
    }

    async post(payload: any): Promise<any> {
        const response = await this.postPromise(payload);
        return response;
    }

    async postMany(payloads: any[]): Promise<any> {
        const psResponses: any[] = await Promise.all(payloads.map((payload: any) =>
            this.postPromise(payload)
        ));
        const responses = [...psResponses];

        return responses;
    }



}
