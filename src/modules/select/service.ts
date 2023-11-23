import { buildRequestContextVer1_1_0 } from "../../common";
import * as mapperService from "../../common/mapper.service";
import { ProtocolServer } from "../../common/protocol-server.service";

export const selectService = async (body: any) => {
    try {
        return await mapperService.map(response.data, "on_select");     // Response will hold response from PS
    } catch (error: any) {
        console.log(error.response.data.error.data.errors);
    }
};
