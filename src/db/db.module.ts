import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OffersRepository } from './repositories/offers.repository';
import { UsersRepository } from './repositories/users.repository';
import { TendersRepository } from './repositories/tenders.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    OffersRepository,
    UsersRepository,
    TendersRepository,
  ],
  exports: [
    PrismaService,
    OffersRepository,
    UsersRepository,
    TendersRepository,
  ],
})
export class DbModule {}
