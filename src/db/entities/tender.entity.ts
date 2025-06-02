import { AutoMap } from '@automapper/classes';
import { TenderStatus } from '../../generated/prisma';
import { DbOffer } from './offer.entity';
import { DbUser } from './user.entity';

export class DbTender {
  @AutoMap()
  id: number;

  @AutoMap()
  title: string;

  @AutoMap()
  description: string | null;

  @AutoMap()
  startingPrice: number;

  @AutoMap()
  currentPrice: number;

  @AutoMap(() => String)
  status: TenderStatus;

  @AutoMap()
  startDate: Date | null;

  @AutoMap()
  endDate: Date | null;

  @AutoMap(() => DbUser)
  author?: DbUser;

  @AutoMap()
  authorId?: number;

  @AutoMap(() => DbUser)
  winner?: DbUser | null;

  @AutoMap()
  winnerId?: number | null;

  @AutoMap(() => [DbOffer])
  offers?: DbOffer[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
