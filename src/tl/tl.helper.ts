import jsonata from "jsonata";
import path from "path";
import fs from "fs";
import appRootPath from "app-root-path";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { XInputService } from "../x-input/x-input.service";
import { container } from "../inversify/inversify.config";

export const context = async (data: any, action: string) => {
  const expression = jsonata(
    fs.readFileSync(
      path.join(appRootPath.toString(), `/mappings/context.jsonata`),
      "utf8"
    )
  );
  return await expression.evaluate(data, {
    env: process.env,
    moment,
    uuid,
    action
  });
};

export async function xInput(xinput: any, action: string) {
  if (action.startsWith("on_") && xinput?.form?.url) {
    const xInputService = container.resolve<XInputService>(XInputService);
    const xInputHTML = await xInputService.getXInputForm(xinput.form.url);
    return {
      url:xinput?.form?.url,
      mime_type: xinput?.form?.mime_type,
      html: xInputHTML
    };
  }
}
