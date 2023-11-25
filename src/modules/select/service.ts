import {
  buildRequestContextVer1_1_0,
  responseContextBuilderVer1_1_0
} from "../../common";
import * as mapperService from "../../common/mapper.service";
import { ProtocolServer } from "../../common/protocol-server.service";

export const selectService = async (body: any) => {
  try {
    const promiseArray: Promise<any>[] = [];
    for (let i = 0; i < body.data.length; i++) {
      const bodyPerBpp = body.data[i];
      const context = buildRequestContextVer1_1_0(
        bodyPerBpp?.context,
        "select"
      );
      const requestForBAP = await mapperService.map(
        { ...bodyPerBpp, context },
        "select"
      );
      console.log(JSON.stringify(requestForBAP), "\n\n\n");
      promiseArray.push(new ProtocolServer(requestForBAP).call());
    }

    const dataFromBPP = await Promise.all(promiseArray);
    const finalArr: any = [];
    for (let i = 0; i < dataFromBPP.length; i++) {
      const responseContext = responseContextBuilderVer1_1_0(
        dataFromBPP[i].data.responses[0]?.context
      );
      const some = await mapperService.map(
        { ...dataFromBPP[i].data.responses[0], context: responseContext },
        "on_select"
      );

      finalArr.push(some);
    }
    return finalArr;
  } catch (error: any) {
    console.log(error.response.data.error.data.errors);
  }
};
