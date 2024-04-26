import "reflect-metadata";
import { describe, it, expect, beforeAll, jest } from "@jest/globals";
import { container } from "../../../inversify/inversify.config";
import { GCLController } from "../../../gcl/gcl.controller";
import HttpClient from "../../../httpclient/http.service";

import SearchRequestFromUI from "./request-from-ui/search.request.json";
import SearchResponseToUI from "./response-to-ui/response.search.json";
import SearchResponseFromPS from "./response-from-ps/search.response.json";

import SelectRequestFromUI from "./request-from-ui/select.request.json";
import SelectResponseToUI from "./response-to-ui/response.select.json";
import SelectResponseFromPS from "./response-from-ps/select.response.json";

import InitRequestFromUI from "./request-from-ui/init.request.json";
import InitResponseToUI from "./response-to-ui/response.init.json";
import InitResponseFromPS from "./response-from-ps/init.response.json";

import ConfirmRequestFromUI from "./request-from-ui/confirm.request.json";
import ConfirmResponseToUI from "./response-to-ui/response.confirm.json";
import ConfirmResponseFromPS from "./response-from-ps/confirm.response.json";

import StatusRequestFromUI from "./request-from-ui/status.request.json";
import StatusResponseToUI from "./response-to-ui/response.status.json";
import StatusResponseFromPS from "./response-from-ps/status.reponse.json";

import CancelRequestFromUI from "./request-from-ui/cancel.request.json";
import CancelResponseToUI from "./response-to-ui/response.cancel.json";
import CancelResponseFromPS from "./response-from-ps/cancel.response.json";

import SupportRequestFromUI from "./request-from-ui/support.request.json";
import SupportResponseToUI from "./response-to-ui/response.support.json";
import SupportResponseFromPS from "./response-from-ps/support.response.json";

import RatingRequestFromUI from "./request-from-ui/rating.request.json";
import RatingResponseToUI from "./response-to-ui/response.rating.json";
import RatingResponseFromPS from "./response-from-ps/rating.response.json";

import UpdateRequestFromUI from "./request-from-ui/update.request.json";
import UpdateResponseToUI from "./response-to-ui/response.update.json";
import UpdateResponseFromPS from "./response-from-ps/update.response.json";

describe("Training Controller Testing", () => {
  let controller: GCLController;
  beforeAll(async () => {
    controller = container.resolve(GCLController);
  });

  it("Controller Should be defined", async () => {
    expect(controller).toBeDefined();
  });

  it("Search API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SearchResponseFromPS);
    const data = await controller.search(SearchRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SearchResponseToUI));
  });

  it("Select API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SelectResponseFromPS);
    const data = await controller.select(SelectRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SelectResponseToUI));
  });

  it("Init API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => InitResponseFromPS);
    const data = await controller.init(InitRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(InitResponseToUI));
  });

  it("Confirm API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => ConfirmResponseFromPS);
    const data = await controller.confirm(ConfirmRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(ConfirmResponseToUI));
  });

  it("Status API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => StatusResponseFromPS);
    const data = await controller.status(StatusRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(StatusResponseToUI));
  });

  it("Cancel API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => CancelResponseFromPS);
    const data = await controller.cancel(CancelRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(CancelResponseToUI));
  });

  it("Support API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SupportResponseFromPS);
    const data = await controller.support(SupportRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SupportResponseToUI));
  });

  it("Rating API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => RatingResponseFromPS);
    const data = await controller.rating(RatingRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(RatingResponseToUI));
  });

  it("Update API for Training should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => UpdateResponseFromPS);
    const data = await controller.update(UpdateRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(UpdateResponseToUI));
  });
});
