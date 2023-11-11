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
