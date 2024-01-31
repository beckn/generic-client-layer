import { inject, injectable } from "inversify";
import { AppLogger } from "../app/app.logger";
import HttpClient from "../httpclient/http.service";
import * as cheerio from "cheerio";

@injectable()
export class XInputService {
  constructor(
    @inject(AppLogger) private logger: AppLogger,
    @inject(HttpClient) private httpClient: HttpClient
  ) {}

  async getXInputForm(url: string) {
    try {
      const xInputRes = await this.httpClient.get<any>(url);

      const xinputHTML = await this.sanatizeXInputHtml(xInputRes?.textHtml);

      return xinputHTML;
    } catch (e) {
      this.logger.error("Error in fetching xinput form", e);
      return {};
    }
  }

  async sanatizeXInputHtml(html: string) {
    const $ = cheerio.load(html);
    const $formAction = $("form").attr("action");
    const $formMethod = $("form").attr("method");
    $("form").attr("id", "xinputform");
    $("form").removeAttr("action");
    $("form").removeAttr("method");
    $("form").append(
      `<input type="hidden" value=${$formAction} id="action" name="action"></input>`
    );
    $("form").append(
      `<input type="hidden" value=${$formMethod} id="method" name="method"></input>`
    );
    $("input[type='submit']").attr("id", "xinputsubmitbutton");
    return $.html();
  }

  async submitXInputForm(body: any) {
    try {
      const actionUrl = body?.action;
      const method = body?.method;
      delete body.action;
      delete body.method;

      const submitFormDataResp = await this.httpClient.client({
        url: actionUrl,
        method,
        data: body
      });
      return submitFormDataResp.data;
    } catch (error: any) {
      return { message: error.message };
    }
  }
}
