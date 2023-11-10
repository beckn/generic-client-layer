import { buildTags } from "./domain/tag.mapping";

export const buildOnSearchResponse = (res: any): any => {
    return {
        context: res.context,
        data: res.responses.map((response: any) => {
            return {
                context: response?.context,
                title: response.message.catalog.descriptor.name,
                providers: response.message.catalog.providers.map((provider: any) => {
                    return {
                        id: provider?.id,
                        name: provider?.descriptor.name,
                        short_desc: provider?.descriptor.short_desc,
                        long_desc: provider?.descriptor.long_desc,
                        images: provider?.descriptor?.images?.map((image: any) => {
                            return {
                                url: image.url
                            }
                        }),
                        media: provider?.descriptor?.media?.map((media: any) => {
                            return {
                                mimetype: media.mimetype,
                                url: media.url
                            }
                        }),
                        items: provider?.items?.map((item: any) => {
                            return {
                                id: item?.id,
                                name: item?.descriptor?.name,
                                short_desc: item?.descriptor?.short_desc,
                                long_desc: item?.descriptor?.long_desc,
                                price: item?.price ? {
                                    value: item?.price?.value,
                                    currency: item?.price?.currency
                                } : undefined,
                                categories: provider?.categoies?.filter((category: any) => item.category_ids.find((category_id: string) => category.id == category_id)).map((category: any) => {
                                    return {
                                        id: category.id,
                                        title: category.descriptor.name,
                                        code: category.descriptor.code
                                    }
                                }),
                                fulfillments: provider?.fulfillments?.filter((fulfillment: any) => item?.fulfillment_ids?.find((fulfillment_id: string) => fulfillment?.id == fulfillment_id)).map((fulfillment: any) => {
                                    return {
                                        id: fulfillment?.id,
                                        type: fulfillment?.type,
                                        tracking: fulfillment?.tracking,
                                        contact: fulfillment?.contact ? {
                                            phone: fulfillment.contact.phone,
                                            email: fulfillment.contact.email
                                        } : undefined,
                                        agent: fulfillment?.agent ? {
                                            person: fulfillment?.agent?.person ? {
                                                id: fulfillment.agent.person.id,
                                                name: fulfillment.agent.person.name,
                                                gender: fulfillment.agent.person.gender,
                                                creds: fulfillment.agent.person.creds,
                                                languages: fulfillment.agent.person.languages,
                                                skills: fulfillment.agent.person.skills
                                            } : undefined,
                                            rating: fulfillment.agent.rating
                                        } : undefined,
                                        stops: "pending",
                                        tags: "pending"
                                    }
                                }),
                                images: item?.descriptor?.images?.map((image: any) => {
                                    return {
                                        url: image?.url
                                    }
                                }),
                                media: item?.descriptor?.media?.map((media: any) => {
                                    return {
                                        mimetype: media?.mimetype,
                                        url: media?.url
                                    }
                                }),
                                locations: provider?.locations?.filter((location: any) => item?.location_ids.find((location_id: string) => location?.id == location_id)).map((location: any) => {
                                    return {
                                        gps: location?.gps,
                                        address: location?.address,
                                        area_code: location?.area_code,
                                        city: location?.city ? {
                                            name: location?.city?.name
                                        } : undefined,
                                        state: location?.state ? {
                                            name: location?.state?.name
                                        } : undefined,
                                        country: location?.country ? {
                                            name: location?.country?.name
                                        } : undefined
                                    }
                                }),
                                rating: item?.rating,
                                rateable: item?.rateable,
                                time: item?.time ? {
                                    label: item?.time?.label,
                                    duration: item?.time?.duration,
                                    range: item?.time?.range ? {
                                        start: item?.time?.range?.start,
                                        end: item?.time?.range?.end
                                    } : undefined
                                } : undefined,
                                quantity: item?.quantity ? {
                                    available: item?.quantity?.available ? {
                                        count: item?.quantity?.available?.count,
                                        value: item?.quantity?.available?.measure?.value,
                                        unit: item?.quantity?.available?.measure?.unit
                                    } : undefined,
                                    maximum: item?.quantity?.maximum ? {
                                        value: item?.quantity?.maximum?.measure?.value,
                                        unit: item?.quantity?.maximum?.measure?.unit
                                    } : undefined,
                                    allocated: item?.quantity?.allocated ? {
                                        count: item?.quantity?.allocated?.count
                                    } : undefined
                                } : undefined,
                                ...(buildTags(item?.tags, res?.context?.domain))
                            }
                        })
                    }
                })
            }
        })
    };
}
