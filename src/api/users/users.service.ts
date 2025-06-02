import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../common/requests/create-user.dto';
import { UpdateUserDto } from '../../common/requests/update-user.dto';

@Injectable()
export class UsersService {
  registerUser(createUserDto: CreateUserDto) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
