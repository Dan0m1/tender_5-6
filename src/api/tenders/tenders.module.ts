import { Module } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';
import { TendersProfile } from './mapper/tenders.profile';
import { TenderCreatePipe } from '../../common/pipes/tender-create.pipe';
import { UserByIdPipe } from '../../common/pipes/user-id.pipe';
import { TenderByIdPipe } from '../../common/pipes/tender-id.pipe';
import { TendersMapperModule } from './mapper/tenders-mapper.module';

@Module({
  controllers: [TendersController],
  providers: [
    TendersService,
    TendersProfile,
    TenderCreatePipe,
    UserByIdPipe,
    TenderByIdPipe,
  ],
  exports: [TendersService, TenderCreatePipe, UserByIdPipe, TenderByIdPipe],
  imports: [TendersMapperModule],
})
export class TendersModule {}
