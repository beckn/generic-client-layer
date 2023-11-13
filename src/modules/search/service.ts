import { buildRequestContextVer1_1_0 } from "../../common";
import { generateMessageForBAP, generateResponseforCl } from "./schemaHelper";
import * as mapperService from "../../common/mapper.service";
import { ProtocolServer } from "../../common/protocol-server.service";

export const searchService = async (body: any) => {
  try {
    const context = buildRequestContextVer1_1_0(body?.context, "search");
    let { message } = generateMessageForBAP(body);
    if (!message) {
      message = {};
    }
    console.log("Payload for BAP=====> ", JSON.stringify({ context, message }));
    const protocolServer = new ProtocolServer({ context, message });
    const data = await protocolServer.call();
    const responseForCl = generateResponseforCl(data.data);

    return responseForCl;
  } catch (error) {
    console.log(error);
  }
};
