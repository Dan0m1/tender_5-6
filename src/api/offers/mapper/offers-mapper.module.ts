import { OffersProfile } from './offers.profile';
import { Module } from '@nestjs/common';

@Module({
  providers: [OffersProfile],
  exports: [OffersProfile],
})
export class OffersMapperModule {}
