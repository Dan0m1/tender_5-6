import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../config/security-config.service';
import { JwtPayload } from '../types/jwt-payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../../../db/repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private securityConfigService: SecurityConfigService,
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || securityConfigService.secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({ id: payload.sub });
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
