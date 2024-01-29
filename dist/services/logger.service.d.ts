import { ConsoleLogger } from "@nestjs/common";
export declare class LoggerService extends ConsoleLogger {
    error(message: string, trace?: string, context?: string): void;
    warn(message: any, context?: string): void;
    log(message: any, context?: string): void;
}
