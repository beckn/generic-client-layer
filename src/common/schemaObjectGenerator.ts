import _ from "lodash";
export interface IDescriptorOutput {
  name?: string;
  code?: string;
  short_desc?: string;
  long_desc?: string;
  additional_desc?: {
    url?: string;
    content_type?: "text/plain" | "text/html" | "application/json";
  };
  media?: {
    mimetype?: string;
    url?: string;
    signature?: string;
    dsa?: string;
  }[];
  images?: {
    url?: string;
    size_type?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
    width?: string;
    height?: string;
  }[];
}
interface DescriptorGeneratorInput {
  descriptionName?: string;
  descriptionCode?: string;
  shortDesc?: string;
  longDesc?: string;
  media?: any[];
  images?: any[];
  descriptionUrl?: string;
  descriptionUrlContentType?: string;
}

export const descriptorGenerator = (
  input: DescriptorGeneratorInput
): IDescriptorOutput => {
  let obj: any = {
    ...(input?.descriptionName && { name: input?.descriptionName }),
    ...(input?.descriptionCode && { code: input?.descriptionCode }),
    ...(input?.shortDesc && { short_desc: input?.shortDesc }),
    ...(input?.longDesc && { long_desc: input?.longDesc }),
    ...(() => {
      if (input?.media?.length) {
        return {
          media: input?.media?.map((medi: any) => ({
            mimetype: medi?.mimetype,
            url: medi?.url,
            signature: medi?.signature,
            dsa: medi?.dsa
          }))
        };
      }
    })(),
    ...(() => {
      if (input?.images?.length) {
        return {
          images: input?.images?.map((image: any) => ({
            url: image?.url,
            size_type: image?.sizeType,
            width: image?.width,
            height: image?.height
          }))
        };
      }
    })(),
    ...(() => {
      if (input?.descriptionUrl)
        return {
          additional_desc: {
            url: input?.descriptionUrl,
            content_type: input?.descriptionUrlContentType
          }
        };
    })()
  };

  return obj;
};
