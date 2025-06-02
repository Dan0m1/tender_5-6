import { TenderResponse } from './tender.response';
import { AutoMap } from '@automapper/classes';
import { OfferResponse } from './offer.response';
import { ApiProperty } from '@nestjs/swagger';

export class TenderWithOffersResponse extends TenderResponse {
  @ApiProperty({
    type: OfferResponse,
    description: 'List of offers related to this tender.',
    isArray: true,
  })
  @AutoMap(() => OfferResponse)
  offers: OfferResponse[];
}
