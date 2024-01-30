import { HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/services/logger.service';

export class BaseController {
  constructor(readonly logger: LoggerService) {}

  reponseMessage(status: number, message: string, @Res() res: Response) {
    res.status(status).send({
      message: message,
      status: status,
    });
  }

  responseCreated(message: string, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send({
      message: message,
      status: HttpStatus.CREATED,
    });
  }

  responseWithData(message: string, data: any, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send({
      message: message,
      data: data,
      status: HttpStatus.OK,
    });
  }

  responseNotFound(message: string, @Res() res: Response) {
    res.status(HttpStatus.NOT_FOUND).send({
      message: message,
      status: HttpStatus.NOT_FOUND,
    });
  }

  responseOK(message: string, @Res() res: Response) {
    res.status(HttpStatus.NOT_FOUND).send({
      message: message,
      status: HttpStatus.OK,
    });
  }

  responseExeption(error: Error) {
    this.logger.error(error.message);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
