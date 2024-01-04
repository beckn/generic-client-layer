import { inject, injectable } from "inversify";
import { AppLogger } from "../app/app.logger";
import { KeyValue } from '../types/common.type';
import { PSClientService } from "../psclient/psclient.service";
import HttpClient from "../httpclient/http.service";

const XINPUTKEY = 'xinput';

@injectable()
export class XInputService {
    constructor(
        @inject(AppLogger) private logger: AppLogger,
        @inject(PSClientService) private psClientService: PSClientService,
        @inject(HttpClient) private httpClient: HttpClient
    ) { }

    async getXInputForm(data: KeyValue) {
        // wrap this into try catch block
        const newData = { ...data };
        for (const key in data) {
            if (key === XINPUTKEY && data[key].form.mime_type === 'text/html') {
                const xInputRes = await this.httpClient.post<string>(data[key].form.url, {
                    context: {
                        action: data.context.action
                    }
                });
                delete data[key].form.url;
                newData[key].form.html = this.sanatizeXInputHtml(xInputRes);
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                this.getXInputForm(data[key]);
            }
        }
        return newData;
    }

    async sanatizeXInputHtml(html: string) {
        // Get action value from form tag, value is url to which form will be submitted
        // Encrypt action url
        // Add hidden field in form with name as bpp_url - this of better name
        // Remove action and method from form tag
    }
}
