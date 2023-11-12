import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { objectSetter } from './utils';

export const map = (data: any) => {
    const action = data.context.action;
    const schema = JSON.parse(fs.readFileSync(path.join(__dirname, `./mappingJsons/response/${action}.json`), 'utf8'));

    return objectSetter(data, schema);
}
