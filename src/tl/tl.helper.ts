import jsonata from "jsonata";
import path from 'path';
import fs from 'fs';
import appRootPath from 'app-root-path';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

export const context = async (data: any, action: string) => {
    const expression = jsonata(fs.readFileSync(path.join(appRootPath.toString(), `/mappings/context.jsonata`), "utf8"));
    return await expression.evaluate(data, { env: process.env, moment, uuid, action });
}
