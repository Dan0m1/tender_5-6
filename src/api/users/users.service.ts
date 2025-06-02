import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../common/requests/create-user.dto';
import { UsersRepository } from 'src/db/repositories/users.repository';
import { UpdateUserDto } from '../../common/requests/update-user.dto';
import { QueryAllUsersDto } from 'src/common/requests/query-all-users.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async getAll(queryDto: QueryAllUsersDto) {
    return this.usersRepository.findMany(queryDto);
  }

  async getById(userId: number) {
    return this.usersRepository.findOne({
      id: userId,
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(userId, updateUserDto);
  }

  async remove(userId: number) {
    return this.usersRepository.delete(userId);
  }
}
