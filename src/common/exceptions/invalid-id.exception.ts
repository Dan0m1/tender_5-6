import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIdException extends HttpException {
  constructor(smth: string) {
    super(`${smth} with such id was not found`, HttpStatus.BAD_REQUEST);
  }
}
