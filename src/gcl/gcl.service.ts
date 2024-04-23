import { inject, injectable } from "inversify";
import { TLService } from "../tl/tl.service";
import { PSClientService } from "../psclient/psclient.service";

@injectable()
export class GCLService {
  constructor(
    @inject(TLService) private tlService: TLService,
    @inject(PSClientService) private psClientService: PSClientService
  ) {}

  async search(body: any) {
    const payload = await this.tlService.transform(body, "search");
    const psResponse = await this.psClientService.post(payload);

    const response = await this.tlService.transform(
      psResponse,
      "on_search",
      body?.includeRawResponse
    );

    return response;
  }

  async select(body: any) {
    const payload = await this.tlService.transform(body, "select");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_select",
      body?.includeRawResponse
    );

    return response;
  }

  async init(body: any) {
    const payload = await this.tlService.transform(body, "init");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_init",
      body?.includeRawResponse
    );

    return response;
  }

  async confirm(body: any) {
    const payload = await this.tlService.transform(body, "confirm");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_confirm",
      body?.includeRawResponse
    );

    return response;
  }

  async status(body: any) {
    const payload = await this.tlService.transform(body, "status");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_status",
      body?.includeRawResponse
    );

    return response;
  }

  async rating(body: any) {
    const payload = await this.tlService.transform(body, "rating");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_rating",
      body?.includeRawResponse
    );

    return response;
  }

  async cancel(body: any) {
    const payload = await this.tlService.transform(body, "cancel");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_cancel",
      body?.includeRawResponse
    );

    return response;
  }

  async update(body: any) {
    const payload = await this.tlService.transform(body, "update");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_update",
      body?.includeRawResponse
    );

    return response;
  }
  async support(body: any) {
    const payload = await this.tlService.transform(body, "support");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_support",
      body?.includeRawResponse
    );

    return response;
  }
  async track(body: any) {
    const payload = await this.tlService.transform(body, "track");
    const psResponse = await this.psClientService.postMany(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_track",
      body?.includeRawResponse
    );

    return response;
  }
}
