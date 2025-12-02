import { inject, injectable } from "inversify";
import { TLService } from "../tl/tl.service";
import { PSClientService } from "../psclient/psclient.service";
import { BAPWebhookService } from "../bapWebhookClient/bapwebhook.service";
import { HttpClient } from "../httpclient/http.service";
import { Response } from "express";
import { AppLogger } from "../app/app.logger";
import { DEGWebhookService } from "../degWebhookClient/degwebhook.service";
import { DEG_DOMAINS } from "../constant/constant";

@injectable()
export class GCLService {
  constructor(
    @inject(TLService) private tlService: TLService,
    @inject(PSClientService) private psClientService: PSClientService,
    @inject(BAPWebhookService) private bapWebhookService: BAPWebhookService,
    @inject(HttpClient) private httpClient: HttpClient,
    @inject(AppLogger) private logger: AppLogger,
    @inject(DEGWebhookService) private degWebhookService: DEGWebhookService
  ) { }

  async search(body: any) {
    const payload = await this.tlService.transform(body, "search");
    const psResponse = await this.psClientService.post(payload);
    this.logger.info("[GCL] PS Response:", JSON.stringify(psResponse, null, 2));
    const response = await this.tlService.transform(
      psResponse,
      "on_search",
      body?.includeRawResponse
    );

    return response;
  }

  async searchAsStream(body: any, res: Response) {
    const payload = await this.tlService.transform(body, "search");
    res.writeHead(200, { "Content-Type": "application/json" });

    const streamResponse = async ({ chunk, isEnd }: any) => {
      if (chunk) {
        try {
          const parsedChunk = JSON.parse(chunk);

          const transformedResponse = await this.tlService.transform(
            parsedChunk,
            "on_search",
            body?.includeRawResponse
          );

          this.logger.info("[GCL] Transformed response:", JSON.stringify(transformedResponse));

          // Send the transformed response to the client
          res.write(JSON.stringify(transformedResponse) + "\n");
        } catch (error) {
          this.logger.error("[GCL] Error processing chunk:", error);
          // Send error response to client
          res.write(JSON.stringify({ error: "Error processing response chunk" }) + "\n");
        }
      }

      if (isEnd) {
        this.logger.info("[GCL] Stream ended");
        res.end();
      }
    };

    try {
      this.httpClient.postFetch(
        this.psClientService.buildUri("search"),
        payload,
        streamResponse
      );
    } catch (error) {
      this.logger.error("[GCL] Error in postFetch:", error);
      res.write(JSON.stringify({ error: "Error making request to server" }) + "\n");
      res.end();
    }
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

  async cred(body: any) {
    const payload = await this.tlService.transform(body, "cred");
    const psResponse = await this.psClientService.post(payload);
    const response = await this.tlService.transform(
      psResponse,
      "on_cred",
      body?.includeRawResponse
    );

    return response;
  }

  async handleUnsolicited(body: any) {
    const { action, domain } = body.context;
    const response = await this.tlService.transform(
      body,
      `${action}`,
      body?.includeRawResponse
    );
    let bapResponse;
    if (DEG_DOMAINS?.includes(domain)) {
      //call DEG webhook
      bapResponse = await this.degWebhookService.post(response);
    } else {
      //call BAP webhook
      bapResponse = await this.bapWebhookService.post(response);
    }
    return bapResponse;
  }
}
