import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../app/app.logger';
import { AxiosError } from 'axios';
import { TLService } from '../tl/tl.service';

@injectable()
export class ErrorHandlerMiddleware {
    constructor(@inject(AppLogger) private logger: AppLogger, @inject(TLService) private tlService: TLService) { }

    public async handleError(error: Error | AxiosError, req: Request, res: Response, next: NextFunction) {
        const { response } = error as AxiosError;
        if (response?.status === 400) {
            const transformedResponse = await this.tlService.transform(response.data, "ps_error");
            return res.status(response.status).json(transformedResponse);
        }
        this.logger.error("%s", error.stack);
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({
            error: {
                message: error.message
            },
        });
    }
}
