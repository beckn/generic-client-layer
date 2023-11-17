import * as mapperService from "../../common/mapper.service";
import { ProtocolServer } from "../../common/protocol-server.service";

export const searchService = async (body: any) => {
  try {
    const request = await mapperService.map(body, 'search');
    const response = await (new ProtocolServer(request)).call();
    return await mapperService.map(response, "on_search")
  } catch (error) {
    console.log(error);
  }
};
