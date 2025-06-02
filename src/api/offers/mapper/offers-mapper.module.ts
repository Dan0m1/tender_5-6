import { OffersProfile } from './offers.profile';
import { forwardRef, Module } from '@nestjs/common';
import { TendersMapperModule } from '../../tenders/mapper/tenders-mapper.module';
import { UsersMapperModule } from '../../users/mapper/users-mapper.module';

@Module({
  providers: [OffersProfile],
  exports: [OffersProfile],
  imports: [
    forwardRef(() => TendersMapperModule),
    forwardRef(() => UsersMapperModule),
  ],
})
export class OffersMapperModule {}
