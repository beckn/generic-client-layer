import { objectSetter } from "../../common/utils";
import SearchJsonConfig from "../../common/mappingJsons/request/searchJson.json";
export const generateMessageForBAP = (input: any) => {
  let message: any = objectSetter(input, SearchJsonConfig);

  return message;
};
