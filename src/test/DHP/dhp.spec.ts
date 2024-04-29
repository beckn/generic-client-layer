import "reflect-metadata";
import { describe, it, expect, beforeAll, jest } from "@jest/globals";
import { container } from "../../inversify/inversify.config";
import { GCLController } from "../../gcl/gcl.controller";
import HttpClient from "../../httpclient/http.service";

import SearchRequestFromUI from "./request-from-ui/search.request.json";
import SearchResponseToUI from "./response-to-ui/response.search.json";
import SearchResponseFromPS from "./response-from-ps/search..response.json";

import SelectRequestFromUI from "./request-from-ui/select.request.json";
import SelectResponseToUI from "./response-to-ui/response.select.json";
import SelectResponseFromPS from "./response-from-ps/select.response.json";

import CancelRequestFromUI from "./request-from-ui/cancel.request.json";
import CancelResponseToUI from "./response-to-ui/response.cancel.json";
import CancelResponseFromPS from "./response-from-ps/cancel.response.json";

import ConfirmRequestFromUI from "./request-from-ui/confirm.request.json";
import ConfirmResponseToUI from "./response-to-ui/response.confirm.json";
import ConfirmResponseFromPS from "./response-from-ps/confirm.response.json";

import InitRequestFromUI from "./request-from-ui/init.request.json";
import InitResponseToUI from "./response-to-ui/response.init.json";
import InitResponseFromPS from "./response-from-ps/init.response.json";

import RatingRequestFromUI from "./request-from-ui/rating.request.json";
import RatingResponseToUI from "./response-to-ui/response.rating.json";
import RatingResponseFromPS from "./response-from-ps/rating.response.json";

import StatusRequestFromUI from "./request-from-ui/status.request.json";
import StatusResponseToUI from "./response-to-ui/response.status.json";
import StatusResponseFromPS from "./response-from-ps/status.response.json";

import SupportRequestFromUI from "./request-from-ui/support.request.json";
import SupportResponseToUI from "./response-to-ui/response.support.json";
import SupportResponseFromPS from "./response-from-ps/support.response.json";

import TrackRequestFromUI from "./request-from-ui/track.request.json";
import TrackResponseToUI from "./response-to-ui/response.track.json";
import TrackResponseFromPS from "./response-from-ps/track.response.json";

import UpdateRequestFromUI from "./request-from-ui/update.request.json";
import UpdateResponseToUI from "./response-to-ui/response.update.json";
import UpdateResponseFromPS from "./response-from-ps/update.response.json";
import { json } from "stream/consumers";

describe("DHP Controller Testing", () => {
  let controller: GCLController;
  beforeAll(async () => {
    controller = container.resolve(GCLController);
  });

  it("Controller Should be defined", async () => {
    let controller = container.resolve(GCLController);

    expect(controller).toBeDefined();
  });

  it("Search API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SearchResponseFromPS);
    const data = await controller.search(SearchRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SearchResponseToUI));
  });

  it("Select API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SelectResponseFromPS);
    const data = await controller.select(SelectRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SelectResponseToUI));
  });

  it("Init API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => InitResponseFromPS);
    const data = await controller.init(InitRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(InitResponseToUI));
  });

  it("Cancel API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => CancelResponseFromPS);
    const data = await controller.cancel(CancelRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(CancelResponseToUI));
  });

  it("Confirm API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => ConfirmResponseFromPS);
    const data = await controller.confirm(ConfirmRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(ConfirmResponseToUI));
  });

  it("Rating API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => RatingResponseFromPS);
    const data = await controller.rating(RatingRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(RatingResponseToUI));
  });

  it("Support API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SupportResponseFromPS);
    const data = await controller.support(SupportRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SupportResponseToUI));
  });

  it("Track API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => TrackResponseFromPS);
    const data = await controller.track(TrackRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(TrackResponseToUI));
  });

  it("Update API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => UpdateResponseFromPS);
    const data = await controller.update(UpdateRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(UpdateResponseToUI));
  });

  it("Status API for DHP should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => StatusResponseFromPS);
    const data = await controller.status(StatusRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(StatusResponseToUI));
  });
});
