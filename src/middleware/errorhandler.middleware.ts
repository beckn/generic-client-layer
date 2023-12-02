import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../app/app.logger';

@injectable()
export class ErrorHandlerMiddleware {
    constructor(@inject(AppLogger) private logger: AppLogger) { }

    public handleError(error: Error, req: Request, res: Response, next: NextFunction): void {
        this.logger.error("%s", error.stack);
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({
            error: {
                message: error.message
            },
        });
    }
}
