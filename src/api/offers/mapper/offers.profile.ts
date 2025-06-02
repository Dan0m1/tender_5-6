import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  extend,
  forMember,
  mapFrom,
  Mapper,
  mapWith,
} from '@automapper/core';
import { DbOffer } from '../../../db/entities/offer.entity';
import { OfferResponse } from '../../../common/responses/offer.response';
import { OfferWithUserAndTenderResponse } from '../../../common/responses/offer-with-user-and-tender.response';

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

      createMap(
        mapper,
        DbOffer,
        OfferWithUserAndTenderResponse,
        extend(DbOffer, OfferResponse),
        forMember(
          (response) => response.tender,
          mapWith(OfferResponse, DbOffer, (source) => source.tender),
        ),
        forMember(
          (response) => response.user,
          mapWith(OfferResponse, DbOffer, (source) => source.user),
        ),
      );
    };
  }
}
