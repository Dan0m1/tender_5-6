import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OffersMapperModule } from './mapper/offers-mapper.module';
import { UserByIdPipe } from '../../common/pipes/user-id.pipe';
import { TenderByIdPipe } from '../../common/pipes/tender-id.pipe';

@Module({
  controllers: [OffersController],
  providers: [OffersService, UserByIdPipe, TenderByIdPipe],
  exports: [OffersService, UserByIdPipe, TenderByIdPipe],
  imports: [OffersMapperModule],
})
export class OffersModule {}
