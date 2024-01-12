import "reflect-metadata";
import { describe, it, expect, beforeAll, jest } from "@jest/globals";

import { container } from "../../inversify/inversify.config";
import { GCLController } from "../../gcl/gcl.controller";
import HttpClient from "../../httpclient/http.service";
import SearchRequestFromUI from "./request-from-ui/search.request.json";
import SearcResponseFromPS from "./response-from-ps/search.response.json";
import SearchResponseToUI from "./response-to-ui/response.search.json";
describe("Local-retail Controller Testing", () => {
  let controller: GCLController;
  beforeAll(async () => {
    controller = container.resolve(GCLController);
  });

  it("Controller Should be defined", async () => {
    expect(controller).toBeDefined();
  });

  it("Search API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SearcResponseFromPS);
    const data = await controller.search(SearchRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SearchResponseToUI));
  });
});
