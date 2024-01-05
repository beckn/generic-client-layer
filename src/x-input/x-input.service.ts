import { inject, injectable } from "inversify";
import { AppLogger } from "../app/app.logger";
import { KeyValue } from "../types/common.type";
import { PSClientService } from "../psclient/psclient.service";
import HttpClient from "../httpclient/http.service";
import * as cheerio from "cheerio";
const XINPUTKEY = "xinput";

@injectable()
export class XInputService {
  constructor(
    @inject(AppLogger) private logger: AppLogger,
    @inject(PSClientService) private psClientService: PSClientService,
    @inject(HttpClient) private httpClient: HttpClient
  ) {}
  async getXInputForm(data: KeyValue) {
    // wrap this into try catch block
    // const newData = { ...data };
    // for (const key in data) {
    //   //   console.log(key);
    //   if (key === XINPUTKEY && data[key].form.mime_type === "text/html") {
    //     const xInputRes = await this.httpClient.get<string>(data[key].form.url);
    //     // delete data[key].form.url;

    //     this.someVar.message.order.items[0].xinput.form.html =
    //       await this.sanatizeXInputHtml(xInputRes);
    //   } else if (typeof data[key] === "object" && data[key] !== null) {
    //     this.getXInputForm(data[key]);
    //   }
    // }
    const xInputRes = await this.httpClient.get<any>(
      data.message.order.items[0].xinput.form.url
    );
    delete data.message.order.items[0].xinput.form.url;
    data.message.order.items[0].xinput.form.html = (
      await this.sanatizeXInputHtml(xInputRes.textHtml)
    ).html;
    data.message.order.items[0].xinput.form.action = (
      await this.sanatizeXInputHtml(xInputRes.textHtml)
    ).action;
    data.message.order.items[0].xinput.form.method = (
      await this.sanatizeXInputHtml(xInputRes.textHtml)
    ).method;
    return data;
  }

  async sanatizeXInputHtml(html: string) {
    const $ = cheerio.load(html);
    const $formAction = $("form").attr("action");
    const $formMethod = $("form").attr("method");
    console.log("Form Attributes", { $formAction, $formMethod });
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
    return {
      html: $.html(),
      action: "http://localhost:3002/submitForm",
      method: "POST"
    };
  }

  async submitXinputForm(body: any) {
    try {
      const actionUrl = body?.action;

      delete body.action;
      delete body.method;
      const submitFormDataResp = await this.httpClient.post(actionUrl, body);

      return submitFormDataResp;
    } catch (error: any) {
      return { message: error.message };
    }
  }
}
