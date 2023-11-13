import { responseContextBuilderVer1_1_0 } from "../../common";
import { objectSetter, map } from "../../common/mapper.service";
import SearchJsonConfig from "../../common/mappingJsons/request/searchJson.json";
export const generateMessageForBAP = (input: any) => {
  let message: any = objectSetter(input, SearchJsonConfig);
  return message;
};

export const generateResponseforCl = (input: any) => {
  const responsesFromBPP = input.responses;
  const data = responsesFromBPP?.map((response: any) => {
    const context = responseContextBuilderVer1_1_0(response?.context);
    return { ...map(response), context };
  });
  return data;
};
