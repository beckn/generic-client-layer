import fs from "fs";
import path from "path";
import appRootPath from 'app-root-path';
import jsonata from 'jsonata';
import { removeEmptyObjectKeys } from './utils'

export const map = async (data: any, action?: string) => {
  const expression = jsonata(fs.readFileSync(path.join(appRootPath.toString(), `/mappings/${action}.jsonata`), "utf8"));

  let mapped = await expression.evaluate(data);
  mapped = removeEmptyObjectKeys(mapped);
  return mapped;
};
