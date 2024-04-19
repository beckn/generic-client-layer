import { inject, injectable } from "inversify";
import jsonata from "jsonata";
import path from 'path';
import appRootPath from "app-root-path";
import fs from 'fs';
import { ObjectUtil } from "../util/object.util";
import * as tlHelpers from './tl.helper'
import { AppLogger } from "../app/app.logger";

@injectable()
export class TLService {
    constructor(@inject(AppLogger) private logger: AppLogger) { }
    async transform(data: any, action: string) {
        const expression = jsonata(fs.readFileSync(path.join(appRootPath.toString(), `/mappings/${action}.jsonata`), "utf8"));

        this.logger.info("Transforming %s data: \n%o", action, JSON.stringify(data));
        let transformed = await expression.evaluate(data, { action, ...tlHelpers });
        transformed = ObjectUtil.removeEmptyObjectKeys(transformed)
        // If no response from BPP, return empty/defult response
        if (!Object.keys(transformed).length) {
            transformed = {
                data: []
            };
        }
        this.logger.info("Transformed %s data: \n%o", action, JSON.stringify(transformed));

        return transformed;
    }
}
