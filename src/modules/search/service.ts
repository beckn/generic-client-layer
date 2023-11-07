import { buildRequestContextVer1_1_0 } from "../../common";

export const searchService = (body: any) => {
  const context = buildRequestContextVer1_1_0(body?.context, "search");
  return { context };
};
