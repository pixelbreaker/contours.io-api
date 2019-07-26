import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.code === 11000) {
      const field = exception.errmsg.split('index: ')[1].split(/_\d/)[0];
      response
        .status(422)
        .json({ message: `Item already exists with that ${field}.` });
    } else {
      response.status(500).json({ message: 'Internal error.' });
    }
  }
}
