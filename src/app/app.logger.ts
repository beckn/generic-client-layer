import { injectable } from "inversify";
import winston, { Logger, format } from "winston";
import "winston-daily-rotate-file";
import { format as printf } from 'util';

@injectable()
export class AppLogger {
    private logger: Logger;

    constructor() {
        const logFormat = format.printf(info => `\n${info.timestamp} [${info.level}]: ${info.message}`)
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp to the log message
                winston.format.simple()
            ),
            transports: [
                new winston.transports.Console({
                    format: format.combine(format.colorize(), logFormat, format.splat()),
                }),
                new winston.transports.DailyRotateFile({
                    level: "info",
                    filename: "logs/info/%DATE%.log",
                    datePattern: "YYYY-MM-DD-HH",
                    zippedArchive: true,
                    maxSize: "20m",
                    maxFiles: "30d"
                }),
                new winston.transports.DailyRotateFile({
                    level: "error",
                    filename: "logs/error/%DATE%.log",
                    datePattern: "YYYY-MM-DD-HH",
                    zippedArchive: true,
                    maxSize: "20m",
                    maxFiles: "30d"
                }),
                new winston.transports.DailyRotateFile({
                    filename: 'logs/combined/%DATE%.log',
                    datePattern: "YYYY-MM-DD-HH",
                    zippedArchive: true,
                    maxSize: "20m",
                    maxFiles: "30d"
                })
            ],
            exitOnError: false
        });
    }

    public info(message: string, ...args: any[]): void {
        this.logger.info(this.formatMessage(message, args));
    }

    public error(message: string, ...args: any[]): void {
        this.logger.error(this.formatMessage(message, args));
    }

    private formatMessage(message: string, args: any[]): string {
        return args.length > 0 ? printf(message, ...args) : message;
    }
}
