import { inject, injectable } from "inversify";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import { GCLService } from "./gcl.service";
import { XInputService } from "../x-input/x-input.service";

@controller("/")
export class GCLController {
  constructor(
    @inject(GCLService) private service: GCLService,
    @inject(XInputService) private xinputService: XInputService
  ) {}

  @httpPost("search")
  public async search(@requestBody() body: any): Promise<any> {
    const searchResult = await this.service.search(body);
    return searchResult;
  }

  @httpPost("select")
  public async select(@requestBody() body: any): Promise<any> {
    const selectResult = await this.service.select(body);
    return selectResult;
  }

  @httpPost("init")
  public async init(@requestBody() body: any): Promise<any> {
    const initResult = await this.service.init(body);
    return initResult;
  }

  @httpPost("confirm")
  public async confirm(@requestBody() body: any): Promise<any> {
    const confirmResult = await this.service.confirm(body);
    return confirmResult;
  }

  @httpPost("status")
  public async status(@requestBody() body: any): Promise<any> {
    const statusResult = await this.service.status(body);
    return statusResult;
  }

  @httpPost("rating")
  public async rating(@requestBody() body: any): Promise<any> {
    const statusResult = await this.service.rating(body);
    return statusResult;
  }

  @httpPost("cancel")
  public async cancel(@requestBody() body: any): Promise<any> {
    const statusResult = await this.service.cancel(body);
    return statusResult;
  }

  @httpPost("update")
  public async update(@requestBody() body: any): Promise<any> {
    const updateResult = await this.service.update(body);
    return updateResult;
  }

  @httpPost("support")
  public async support(@requestBody() body: any): Promise<any> {
    const updateResult = await this.service.support(body);
    return updateResult;
  }
  @httpPost("track")
  public async track(@requestBody() body: any): Promise<any> {
    const trackResult = await this.service.track(body);
    return trackResult;
  }

  @httpPost("x-input/submit")
  public async submitXInputForm(@requestBody() body: any): Promise<any> {
    const submitFormResp = await this.xinputService.submitXInputForm(body);

    return submitFormResp;
  }
}
