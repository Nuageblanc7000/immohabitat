import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception instanceof Error);
    if (exception instanceof HttpException) {
      // Gérer les exceptions spécifiques (ex: NotFoundException, BadRequestException)
      const status = exception.getStatus();
      const { message } = <any>exception.getResponse();
      const error = exception.getResponse();
      response.status(status).json({
        statusCode: status,
        message: message,
        error: exception.message,
      });
    } else {
      // Gérer les exceptions génériques (Internal Server Error)
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error !!!',
      });
    }
  }
}
