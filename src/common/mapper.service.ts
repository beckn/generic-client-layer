import fs from "fs";
import path from "path";
import appRootPath from 'app-root-path';
import jsonata from 'jsonata';

export const map = (data: any, action?: string) => {
  const expression = jsonata(fs.readFileSync(path.join(appRootPath.toString(), `/mappings/${action}.jsonata`), "utf8"));
  return expression.evaluate(data);
};
