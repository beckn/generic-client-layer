import { buildRequestContextVer1_1_0 } from "../../common";
import { generateMessageForBAP } from "./schemaHelper";

export const searchService = (body: any) => {
  const context = buildRequestContextVer1_1_0(body?.context, "search");
  let { message } = generateMessageForBAP(body);
  if (!message) {
    message = {};
  }

  return { context, message };
};
