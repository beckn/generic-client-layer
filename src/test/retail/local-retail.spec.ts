import "reflect-metadata";
import { describe, it, expect, beforeAll, jest } from "@jest/globals";

import { container } from "../../inversify/inversify.config";
import { GCLController } from "../../gcl/gcl.controller";
import HttpClient from "../../httpclient/http.service";
import SearchRequestFromUI from "./request-from-ui/search.request.json";
import SearchResponseToUI from "./response-to-ui/response.search.json";
import SearchResponseFromPS from "./response-from-ps/search.response.json";

import SelectResponseFromPS from "./response-from-ps/select.response.json";
import SelectResponseToUI from "./response-to-ui/response.select.json";
import SelectRequestFromUI from "./request-from-ui/select.request.json";

describe("Local-retail Controller Testing", () => {
  let controller: GCLController;
  beforeAll(async () => {
    controller = container.resolve(GCLController);
  });

  it("Controller Should be defined", async () => {
    expect(controller).toBeDefined();
  });

  it.skip("Search API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SearchResponseFromPS);
    const data = await controller.search(SearchRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SearchResponseToUI));
  });

  it("Select API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SelectResponseFromPS);
    const data = await controller.select(SelectRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SelectResponseToUI));
  });
});
