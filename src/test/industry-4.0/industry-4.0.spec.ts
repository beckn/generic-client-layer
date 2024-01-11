import "reflect-metadata";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { Container } from "inversify";
import { GCLController } from "../../gcl/gcl.controller";
import { GCLService } from "../../gcl/gcl.service";
import { XInputService } from "../../x-input/x-input.service";
import { TLService } from "../../tl/tl.service";
import { AppLogger } from "../../app/app.logger";
import { PSClientService } from "../../psclient/psclient.service";
import { ConfigService } from "../../config/config.service";
import HttpClient from "../../httpclient/http.service";
import { ErrorHandlerMiddleware } from "../../middleware/errorhandler.middleware";

const container = new Container();
// container.bind();

describe("GCL Controller Testing", () => {
  // let appLogger = new AppLogger();
  // let configService = new ConfigService();
  // let httpClient = new HttpClient(appLogger);
  // let xinputService = new XInputService(appLogger, httpClient);
  // let psClientService = new PSClientService(configService, httpClient);
  // let tlService = new TLService(appLogger);
  // let gclService = new GCLService(tlService, psClientService);
  // let gclController = new GCLController(gclService, xinputService);
  // let errorHandlerMiddleware = new ErrorHandlerMiddleware(appLogger, tlService);

  let container: Container;

  beforeEach(async () => {
    container = new Container();
    container.bind<GCLController>(GCLController).toSelf();
    container.bind<GCLService>(GCLService).toSelf();

    // appLogger = new AppLogger();
    // configService = new ConfigService();
    // httpClient = new HttpClient(appLogger);
    // xinputService = new XInputService(appLogger, httpClient);
    // psClientService = new PSClientService(configService, httpClient);
    // tlService = new TLService(appLogger);
    // gclService = new GCLService(tlService, psClientService);
    // gclController = new GCLController(gclService, xinputService);
    // errorHandlerMiddleware = new ErrorHandlerMiddleware(appLogger, tlService);
  });

  it("should be defined", () => {
    // let controller = container.resolve(GCLController);
    let service = container.resolve(GCLService);

    // const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
    //     ErrorHandlerMiddleware
    //   );
    //   this.app.use(
    //     errorHandlerMiddleware.handleError.bind(errorHandlerMiddleware)
    //   );
    console.log("======>", service);
    expect(service).toBeDefined();
  });
});
