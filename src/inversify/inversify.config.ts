import { Container } from "inversify";
import "reflect-metadata";
import { ConfigService } from "../config/config.service";
import { GCLService } from "../gcl/gcl.service";
import { TLService } from "../tl/tl.service";
import { InversifyExpressServer } from "inversify-express-utils";
import { PSClientService } from "../psclient/psclient.service";
import { AppLogger } from "../app/app.logger";
import HttpClient from "../httpclient/http.service";
import { ErrorHandlerMiddleware } from "../middleware/errorhandler.middleware";
import { XInputService } from "../x-input/x-input.service";
import { BAPWebhookService } from "../bapWebhookClient/bapwebhook.service";

const container = new Container();
const server = new InversifyExpressServer(container);

container.bind<ConfigService>(ConfigService).to(ConfigService);
container.bind<GCLService>(GCLService).to(GCLService);
container.bind<TLService>(TLService).to(TLService);
container.bind<PSClientService>(PSClientService).to(PSClientService);
container.bind<AppLogger>(AppLogger).to(AppLogger);
container.bind<HttpClient>(HttpClient).to(HttpClient);
container.bind<XInputService>(XInputService).to(XInputService);
container.bind<ErrorHandlerMiddleware>(ErrorHandlerMiddleware).toSelf();
container.bind<BAPWebhookService>(BAPWebhookService).to(BAPWebhookService);

export { server, container };
