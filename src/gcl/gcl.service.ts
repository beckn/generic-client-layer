import { inject, injectable } from "inversify";
import { TLService } from "../tl/tl.service";
import { PSClientService } from "../psclient/psclient.service";

@injectable()
export class GCLService {
    constructor(
        @inject(TLService) private tlService: TLService,
        @inject(PSClientService) private psClientService: PSClientService
    ) { }

    async search(body: any) {
        const payload = await this.tlService.transform(body, "search");
        const psResponse = await this.psClientService.post(payload);
        const response = await this.tlService.transform(psResponse, "on_search");

        return response;
    }

    async select(body: any) {
        const payload = await this.tlService.transform(body, "select");
        const psResponse = await this.psClientService.postMany(payload);
        const response = await this.tlService.transform(psResponse, "on_select");

        return response;
    }

    async init(body: any) {
        const payload = await this.tlService.transform(body, "init");
        const psResponse = await this.psClientService.postMany(payload);
        const response = await this.tlService.transform(psResponse, "on_init");

        return response;
    }

    async confirm(body: any) {
        // const payload = await this.tlService.transform(body, "select");
        // const psResponse = await this.psClientService.postMany(payload);
        // const response = await this.tlService.transform(psResponse, "on_select");

        // return response;

        return "In Progress";
    }

    async status(body: any) {
        // const payload = await this.tlService.transform(body, "select");
        // const psResponse = await this.psClientService.postMany(payload);
        // const response = await this.tlService.transform(psResponse, "on_select");

        // return response;

        return "In Progress";
    }
}