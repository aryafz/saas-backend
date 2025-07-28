import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    if (exception.code === 'P2002') {
      res.status(409).json({ message: 'Conflict' });
      return;
    }
    if (exception.code === 'P2003') {
      res.status(400).json({ message: 'Invalid reference' });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
