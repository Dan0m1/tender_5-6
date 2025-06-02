import { AutoMap } from '@automapper/classes';
import { OfferStatus } from '../../generated/prisma';
import { DbTender } from './tender.entity';
import { DbUser } from './user.entity';

export class DbOffer {
  @AutoMap()
  id: number;

  @AutoMap()
  amount: number;

  @AutoMap()
  description?: string | null;

  @AutoMap(() => String)
  status: OfferStatus;

  @AutoMap(() => DbTender)
  tender?: DbTender;

  @AutoMap()
  tenderId: number;

  @AutoMap(() => DbUser)
  user?: DbUser;

  @AutoMap()
  userId: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
