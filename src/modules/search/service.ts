import { buildRequestContextVer1_1_0 } from "../../common";
import * as mapperService from "../../common/mapper.service";
import { ProtocolServer } from "../../common/protocol-server.service";

export const searchService = async (body: any) => {
  try {
    const context = buildRequestContextVer1_1_0(body?.context, "search");
    const request = await mapperService.map({ ...body, context }, "search");
    console.log(JSON.stringify(request));
    const response = await new ProtocolServer(request).call();

    return await mapperService.map(response.data, "on_search");
  } catch (error: any) {
    console.log(error.response.data.error.data.errors);
  }
};
