import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigurationModule } from '../../config/config.module';
import { AuthController } from './auth.controller';
import { AccessModule } from '../access/access.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, LocalStrategy],
  imports: [PassportModule, ConfigurationModule, AccessModule],
})
export class AuthModule {}
