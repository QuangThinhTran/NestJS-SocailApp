import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  error(message: string, trace?: string, context?: string): void {
    super.error(message, trace, context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  log(message: any, context?: string) {
    super.log(message, context);
  }
}
