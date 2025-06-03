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
import { TokensDto } from './types/tokens.dto';
import {ApiBasicAuth, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiOkResponse({
    description: 'The user has been successfully logged in.',
    type: TokensDto,
  })
  @ApiBody({
    type: RegistrationCredentialsDto,
  })
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@GetUser() user: UserEntity): Promise<TokensDto> {
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Register user',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
    type: TokensDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: RegistrationCredentialsDto): Promise<TokensDto> {
    return this.authService.register(body);
  }
}
