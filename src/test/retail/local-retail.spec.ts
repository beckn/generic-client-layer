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

import InitResponseFromPS from "./response-from-ps/init.response.json";
import InitResponseToUI from "./response-to-ui/response.init.json";
import InitRequestFromUI from "./request-from-ui/init.request.json";

import ConfirmResponseFromPS from "./response-from-ps/confirm.response.json";
import ConfirmReponseToUI from "./response-to-ui/response.confirm.json";
import ConfirmRequestFromUI from "./request-from-ui/confirm.request.json";

import StatusResponseFromPS from "./response-from-ps/status.response.json";
import StatusResponseToUI from "./response-to-ui/response.status.json";
import StatusRequestFromUI from "./request-from-ui/status.request.json";

import CancelResponseFromPS from "./response-from-ps/cancel.response.json";
import CancelResponseToUI from "./response-to-ui/resopnse.cancel.json";
import CancelRequestFromUI from "./request-from-ui/cancel.request.json";

import RatingResponseFromPS from "./response-from-ps/rating.response.json";
import RatingResponseToUI from "./response-to-ui/response.rating.json";
import RatingRequestFromUI from "./request-from-ui/rating.request.json";

import SupportResponseFromPS from "./response-from-ps/support.response.json";
import SupportResponseToUI from "./response-to-ui/response.supprt.json";
import SupportRequestFromUI from "./request-from-ui/support.request.json";

import TrackResponseFromPS from "./response-from-ps/track.response.json";
import TrackResponseToUI from "./response-to-ui/response.track.json";
import TrackRequestFromUI from "./request-from-ui/track.request.json";

import UpdateResponseFromPS from "./response-from-ps/update.response.json";
import UpdateResponseToUI from "./response-to-ui/response.update.json";
import UpdateRequestFromUI from "./request-from-ui/update.request.json";

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

  it("Init API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => InitResponseFromPS);
    const data = await controller.init(InitRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(InitResponseToUI));
  });

  it("Confirm API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => ConfirmResponseFromPS);
    const data = await controller.confirm(ConfirmRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(ConfirmReponseToUI));
  });

  it("Status API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => StatusResponseFromPS);
    const data = await controller.status(StatusRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(StatusResponseToUI));
  });

  it("Cancel API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => CancelResponseFromPS);
    const data = await controller.cancel(CancelRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(CancelResponseToUI));
  });

  it("Rating API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => RatingResponseFromPS);
    const data = await controller.rating(RatingRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(RatingResponseToUI));
  });

  it("Support API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => SupportResponseFromPS);
    const data = await controller.support(SupportRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(SupportResponseToUI));
  });

  it("Track API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => TrackResponseFromPS);
    const data = await controller.track(TrackRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(TrackResponseToUI));
  });

  it("Update API should be working fine", async () => {
    jest
      .spyOn(HttpClient.prototype, "post")
      .mockImplementation(async () => UpdateResponseFromPS);
    const data = await controller.update(UpdateRequestFromUI);
    expect(JSON.stringify(data)).toEqual(JSON.stringify(UpdateResponseToUI));
  });
});
