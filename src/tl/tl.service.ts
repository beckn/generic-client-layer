import { inject, injectable } from "inversify";
import jsonata from "jsonata";
import path from "path";
import appRootPath from "app-root-path";
import fs from "fs";
import { ObjectUtil } from "../util/object.util";
import * as tlHelpers from "./tl.helper";
import { AppLogger } from "../app/app.logger";
import { XInputService } from "../x-input/x-input.service";
@injectable()
export class TLService {
  constructor(
    @inject(AppLogger) private logger: AppLogger,
    @inject(XInputService) private xinputService: XInputService
  ) {}
  async transform(data: any, action: string) {
    const expression = jsonata(
      fs.readFileSync(
        path.join(appRootPath.toString(), `/mappings/${action}.jsonata`),
        "utf8"
      )
    );
    let newData = data;
    if (action.includes("on_")) {
      console.log("here");
      newData = await this.getXinputFormsHTML(data);
    }
    this.logger.info(
      "Transforming %s data: \n%o",
      action,
      JSON.stringify(data)
    );
    let transformed = await expression.evaluate(data, { action, ...tlHelpers });
    transformed = ObjectUtil.removeEmptyObjectKeys(transformed);
    this.logger.info(
      "Transformed %s data: \n%o",
      action,
      JSON.stringify(transformed)
    );

    return transformed;
  }

  async getXinputFormsHTML(datas: any[]) {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      const { responses = [] } = data;
      for (let i = 0; i < responses.length; i++) {
        let response = responses[i];
        const newData = await this.xinputService.getXInputForm(response);
        response = newData;
      }
    }
    return datas;
  }
}
