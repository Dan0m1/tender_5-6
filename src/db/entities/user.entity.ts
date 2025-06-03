import { AutoMap } from '@automapper/classes';
import { UserRole } from '../../generated/prisma';
import { DbTender } from './tender.entity';
import { DbOffer } from './offer.entity';

export class UserEntity {
  id: number;
  username: string;
}

export class DbUser {
  @AutoMap()
  id: number;

  @AutoMap()
  username: string;

  password?: string;

  @AutoMap()
  email?: string | null;

  @AutoMap()
  balance?: number;

  @AutoMap(() => String)
  role?: UserRole;

  @AutoMap()
  isActive?: boolean;

  @AutoMap()
  lastLoginAt?: Date | null;

  @AutoMap(() => [DbTender])
  createdTenders?: DbTender[];

  @AutoMap(() => [DbTender])
  wonTenders?: DbTender[];

  @AutoMap(() => [DbOffer])
  offers?: DbOffer[];

  @AutoMap()
  createdAt?: Date;

  @AutoMap()
  updatedAt?: Date;
}
