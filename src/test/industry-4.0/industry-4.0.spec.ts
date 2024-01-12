import "reflect-metadata";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { container } from "../../inversify/inversify.config";
import { GCLController } from "../../gcl/gcl.controller";
import HttpClient from "../../httpclient/http.service";

describe("Industry 4.0 Controller Testing", () => {
  beforeEach(async () => {});

  it("Controller Should be defined", async () => {
    let controller = container.resolve(GCLController);

    expect(controller).toBeDefined();
  });
});
