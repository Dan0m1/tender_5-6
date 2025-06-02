import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  extend,
  forMember,
  mapFrom,
  Mapper,
  mapWith,
} from '@automapper/core';
import { DbTender } from '../../../db/entities/tender.entity';
import { TenderResponse } from '../../../common/responses/tender.response';
import { TenderWithOffersResponse } from '../../../common/responses/tender-with-offers.response';
import { OfferResponse } from '../../../common/responses/offer.response';
import { DbOffer } from '../../../db/entities/offer.entity';

export class TendersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        DbTender,
        TenderResponse,
        forMember(
          (response) => response.description,
          mapFrom((source) => (source.description ? source.description : null)),
        ),
        forMember(
          (response) => response.startDate,
          mapFrom((source) => (source.startDate ? source.startDate : null)),
        ),
        forMember(
          (response) => response.endDate,
          mapFrom((source) => (source.endDate ? source.endDate : null)),
        ),
        forMember(
          (response) => response.winnerId,
          mapFrom((source) => (source.winnerId ? source.winnerId : null)),
        ),
      );

      createMap(
        mapper,
        DbTender,
        TenderWithOffersResponse,
        extend(DbTender, TenderResponse),
        forMember(
          (response) => response.offers,
          mapWith(OfferResponse, DbOffer, (source) => source.offers),
        ),
      );
    };
  }
}
