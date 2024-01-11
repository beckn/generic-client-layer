import "reflect-metadata";
import express, { Application, NextFunction } from "express";
import { container, server } from "./inversify/inversify.config";
import "./gcl/gcl.controller";
import { ConfigService } from "./config/config.service";
import { AppLogger } from "./app/app.logger";
import { ErrorHandlerMiddleware } from "./middleware/errorhandler.middleware";
import cors from "cors";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.setupMiddlewares();
  }

  private config(): void {
    server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.options(
        "*",
        cors({
          origin: "*",
          optionsSuccessStatus: 200,
          credentials: true,
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
        })
      );

      app.use(
        cors({
          origin: "*",
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
        })
      );
    });

    this.app.use(server.build());
  }

  private setupMiddlewares() {
    // const errorHandlerMiddleware = container.get<ErrorHandlerMiddleware>(
    //   ErrorHandlerMiddleware
    // );
    // this.app.use(
    //   errorHandlerMiddleware.handleError.bind(errorHandlerMiddleware)
    // );
  }
}

const configService = container.resolve<ConfigService>(ConfigService);
const logger = container.resolve<AppLogger>(AppLogger);

const app = new App().app;
const port = configService.getAppPort();

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
