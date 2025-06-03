import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from '../../common/decorators/get-user';
import { UserEntity } from '../../db/entities/user.entity';
import { RegistrationCredentialsDto } from '../../common/requests/registration-credentials.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@GetUser() user: UserEntity) {
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: RegistrationCredentialsDto) {
    await this.authService.register(body);
  }
}
