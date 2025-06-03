import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../db/repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { SecurityConfigService } from '../../config/security-config.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload';
import { TokensDto } from './types/tokens.dto';
import { CreateUserDto } from '../../common/requests/create-user.dto';
import { RegistrationCredentialsDto } from '../../common/requests/registration-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private securityConfigService: SecurityConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user =
      await this.usersRepository.findByUsernameWithPassword(username);

    if (!user) {
      throw new UnauthorizedException('Wrong credentials.');
    }

    if (!password || !user.password) {
      throw new UnauthorizedException('Wrong credentials.');
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials.');
    }

    delete user.password;
    return user;
  }

  login(user: any): TokensDto {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      createdAt: Date.now(),
    };
    return this.getJwtTokens(payload);
  }

  async register(user: RegistrationCredentialsDto) {
    if (await this.checkIfUserExists(user.username)) {
      throw new UnauthorizedException('User with this username already exists');
    }
    const createDto: CreateUserDto = {
      ...user,
      password: await this.hashPassword(user.password),
    };
    return this.usersRepository.create(createDto);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async checkIfUserExists(username: string) {
    return this.usersRepository.findByUsernameWithPassword(username);
  }

  async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  getJwtTokens(payload: JwtPayload): TokensDto {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.securityConfigService.jwtRefreshTtl,
      }),
    };
  }
}
