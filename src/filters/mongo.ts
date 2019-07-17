import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception.code === 11000) {
      response
        .status(422)
        .json({ message: 'User already exists with that email.' });
    } else {
      response.status(500).json({ message: 'Internal error.' });
    }
  }
}
