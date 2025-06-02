import { Injectable, PipeTransform } from '@nestjs/common';
import { UsersRepository } from '../../db/repositories/users.repository';
import { InvalidIdException } from '../exceptions/invalid-id.exception';

@Injectable()
export class UserByIdPipe implements PipeTransform<number, Promise<number>> {
  constructor(private usersRepository: UsersRepository) {}

  async transform(id: number) {
    const user = await this.usersRepository.findOne({
      id,
    });
    if (!user) {
      throw new InvalidIdException('User');
    }
    return id;
  }
}
