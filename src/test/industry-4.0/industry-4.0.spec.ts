import "reflect-metadata";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";

import { container } from "../../inversify/inversify.config";
import { GCLController } from "../../gcl/gcl.controller";

describe("GCL Controller Testing", () => {
  beforeEach(async () => {});

  it("should be defined", async () => {
    let controller = container.resolve(GCLController);

    console.log("======>Hello");

    expect(controller).toEqual({});
  });
});
