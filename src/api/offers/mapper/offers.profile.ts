import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { DbOffer } from '../../../db/entities/offer.entity';
import { OfferResponse } from '../../../common/responses/offer.response';

export class OffersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        DbOffer,
        OfferResponse,
        forMember(
          (response) => response.description,
          mapFrom((source) => (source.description ? source.description : null)),
        ),
      );
    };
  }
}
