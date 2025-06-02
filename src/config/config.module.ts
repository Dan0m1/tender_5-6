import { Injectable, Module } from '@nestjs/common';
import { SecurityConfigService } from './security-config.service';
import { ConfigModule } from '@nestjs/config';

@Injectable()
@Module({
  providers: [SecurityConfigService],
  exports: [SecurityConfigService],
})
export class ConfigurationModule extends ConfigModule {}
