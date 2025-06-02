import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { UserResponse } from '../../../common/responses/user.response';
import { DbUser } from '../../../db/entities/user.entity';

export class UsersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        DbUser,
        UserResponse,
        forMember(
          (response) => response.email,
          mapFrom((source) => (source.email ? source.email : null)),
        ),
      );
    };
  }
}
