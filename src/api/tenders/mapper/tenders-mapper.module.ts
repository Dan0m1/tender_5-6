import { TendersProfile } from './tenders.profile';
import { forwardRef, Module } from '@nestjs/common';
import { OffersMapperModule } from '../../offers/mapper/offers-mapper.module';

@Module({
  providers: [TendersProfile],
  exports: [TendersProfile],
  imports: [forwardRef(() => OffersMapperModule)],
})
export class TendersMapperModule {}
