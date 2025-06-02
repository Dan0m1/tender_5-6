import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { TendersModule } from './api/tenders/tenders.module';
import { AuthModule } from './api/auth/auth.module';
import { OffersModule } from './api/offers/offers.module';
import { ConfigurationModule } from './config/config.module';
import configuration from './config/config.constants';
import { DbModule } from './db/db.module';
import { SecurityConfigService } from './config/security-config.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    UsersModule,
    TendersModule,
    AuthModule,
    OffersModule,
    DbModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigurationModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
  ],
  providers: [SecurityConfigService],
})
export class AppModule {}
