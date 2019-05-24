import {Catch, ExceptionFilter} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host) {
        // TODO remove when proper logger will be implemented
        console.error(exception);
        host.switchToHttp().getResponse()
            .status(exception.status || 500)
            .json({
                status: exception.status || 500,
                message: exception.sqlMessage || exception.message,
            });
    }
}