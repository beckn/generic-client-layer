import fs from "fs";
import path from "path";
import _ from "lodash";

export const objectSetter = (data: any, schema: any) => {
  const result = {};

  Object.entries(schema).forEach(([sourceSchema, targetSchema]: any) => {
    if (_.get(data, sourceSchema, null)) {
      _.set(
        result,
        targetSchema.path as string,
        _.get(data, sourceSchema as string)
      );
      if (sourceSchema === "location") {
        _.set(result, "message.intent.location.circle.radius", {
          type: "CONSTANT",
          value: "5",
          unit: "km"
        });
      }
    }
  });
  return result;
};

export const map = (data: any) => {
  const action = data.context.action;
  const schema = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `./mappingJsons/response/${action}.json`),
      "utf8"
    )
  );

  return objectSetter(data, schema);
};
