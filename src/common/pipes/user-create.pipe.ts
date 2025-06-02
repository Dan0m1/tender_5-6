import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../requests/create-user.dto';

@Injectable()
export class UserCreatePipe
  implements PipeTransform<CreateUserDto, Promise<CreateUserDto>>
{
  async transform(value: CreateUserDto) {
    return value;
  }
}
