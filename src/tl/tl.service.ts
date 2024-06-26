import { inject, injectable } from "inversify";
import jsonata from "jsonata";
import path from "path";
import appRootPath from "app-root-path";
import fs from "fs";
import { ObjectUtil } from "../util/object.util";
import * as tlHelpers from "./tl.helper";
import { AppLogger } from "../app/app.logger";

@injectable()
export class TLService {

  constructor(@inject(AppLogger) private logger: AppLogger) { }

  async transform(data: any, action: string, includeRawResponse?: boolean) {
    const expression = jsonata(
      fs.readFileSync(
        path.join(appRootPath.toString(), `/mappings/${action}.jsonata`),
        "utf8"
      )
    );

    this.logger.info(

      "Transforming %s data: \n%o \n\n",

      action,
      JSON.stringify(data)
    );
    let transformed = await expression.evaluate(data, {
      action,
      includeRawResponse,
      ...tlHelpers
    });
    transformed = ObjectUtil.removeEmptyObjectKeys(transformed);
    this.logger.info(

      "Transformed %s data: \n%o \n\n",

      action,
      JSON.stringify(transformed)
    );

    return transformed;
  }
}
