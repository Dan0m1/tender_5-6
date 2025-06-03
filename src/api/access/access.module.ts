import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../../config/config.module';
import { SecurityConfigService } from '../../config/security-config.service';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule],
  imports: [
    PassportModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: configService.jwtTtl,
        },
      }),
    }),
  ],
})
export class AccessModule {}
