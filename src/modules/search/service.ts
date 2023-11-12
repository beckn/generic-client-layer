import { buildRequestContextVer1_1_0 } from "../../common";
import { generateMessageForBAP } from "./schemaHelper";
import * as mapperService from '../../common/mapper.service';

export const searchService = (body: any) => {
  const context = buildRequestContextVer1_1_0(body?.context, "search");
  let { message } = generateMessageForBAP(body);
  if (!message) {
    message = {};
  }


  return mapperService.map(onSearchResponse?.responses[0]); // onSearchResponse is response from protocol server

  return { context, message };
};
