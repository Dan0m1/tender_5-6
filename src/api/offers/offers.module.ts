import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OffersMapperModule } from './mapper/offers-mapper.module';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
  imports: [OffersMapperModule],
})
export class OffersModule {}
