import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  response
} from "inversify-express-utils";
import fs from "fs";
import path from "path";
import appRootPath from "app-root-path";
import { GCLService } from "./gcl.service";
import { XInputService } from "../x-input/x-input.service";
import { Response } from "express";
import { LogLevelEnum } from "../types/logs.type";
import { AppLogger } from "../app/app.logger";
import { ConfigService } from "../config/config.service";

@controller("/")
export class GCLController {
  constructor(
    @inject(GCLService) private service: GCLService,
    @inject(XInputService) private xinputService: XInputService,
    @inject(AppLogger) private logger: AppLogger,
    @inject(ConfigService) private configService: ConfigService
  ) {}

  @httpPost("search")
  public async search(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    if (this.configService.getStreamOnSearch()) {
      await this.service.searchAsStream(body, res as Response);
    } else {
      const searchResult = await this.service.search(body);
      if (!Object.keys(searchResult).length) {
        return res?.status(200).json({});
      }
      return searchResult;
    }
  }

  @httpPost("select")
  public async select(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const selectResult = await this.service.select(body);
    if (!Object.keys(selectResult).length) {
      return res?.status(400).json({});
    }
    return selectResult;
  }

  @httpPost("init")
  public async init(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const initResult = await this.service.init(body);
    if (!Object.keys(initResult).length) {
      return res?.status(400).json({});
    }
    return initResult;
  }

  @httpPost("confirm")
  public async confirm(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const confirmResult = await this.service.confirm(body);
    if (!Object.keys(confirmResult).length) {
      return res?.status(400).json({});
    }
    return confirmResult;
  }

  @httpPost("status")
  public async status(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const statusResult = await this.service.status(body);
    if (!Object.keys(statusResult).length) {
      return res?.status(400).json({});
    }
    return statusResult;
  }

  @httpPost("rating")
  public async rating(@requestBody() body: any): Promise<any> {
    const statusResult = await this.service.rating(body);
    return statusResult;
  }

  @httpPost("cancel")
  public async cancel(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const statusResult = await this.service.cancel(body);
    if (!Object.keys(statusResult).length) {
      return res?.status(400).json({});
    }
    return statusResult;
  }

  @httpPost("update")
  public async update(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const updateResult = await this.service.update(body);
    if (!Object.keys(updateResult).length) {
      return res?.status(400).json({});
    }
    return updateResult;
  }

  @httpPost("support")
  public async support(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const updateResult = await this.service.support(body);
    if (!Object.keys(updateResult).length) {
      return res?.status(400).json({});
    }
    return updateResult;
  }
  @httpPost("track")
  public async track(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const trackResult = await this.service.track(body);
    if (!Object.keys(trackResult).length) {
      return res?.status(400).json({});
    }
    return trackResult;
  }

  @httpPost("cred")
  public async cred(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    const credResult = await this.service.cred(body);
    if (!Object.keys(credResult).length) {
      return res?.status(400).json({});
    }
    return credResult;
  }

  @httpPost("x-input/submit")
  public async submitXInputForm(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    try {
      const submitFormResp = await this.xinputService.submitXInputForm(body);
      return submitFormResp;
    } catch (error: any) {
      return res
        ?.status(400)
        .json({ error: error?.message || "Failed to submit x-input form" });
    }
  }

  @httpGet("logs")
  public async getLogs(
    @queryParam("type") type: LogLevelEnum,
    @response() res?: Response
  ): Promise<any> {
    try {
      const logDirectory = path.join(appRootPath.toString(), `/logs/${type}`);
      const files = fs.readdirSync(logDirectory);

      if (files.length === 0) {
        res?.status(404).send("No log files found");
        return;
      }

      const latestFile = files[files.length - 1];
      const filePath = path.join(logDirectory, latestFile);

      res?.send(fs.readFileSync(filePath, "utf8"));
    } catch (error: any) {
      this.logger.error(error.message);
      res?.status(500).send("Some Error Occurred");
    }
  }

  @httpPost("unsolicited")
  public async handleUnsolicited(
    @requestBody() body: any,
    @response() res?: Response
  ): Promise<any> {
    try {
      const submitFormResp = await this.service.handleUnsolicited(body);
      return submitFormResp;
    } catch (error: any) {
      return res?.status(400).json({ error: error.message });
    }
  }
}
