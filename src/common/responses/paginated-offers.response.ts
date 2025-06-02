import { ApiProperty } from '@nestjs/swagger';
import { OfferResponse } from './offer.response';
import { PaginationMetaResponse } from './pagination-meta.response';

export class PaginatedOffersResponse {
  @ApiProperty({
    type: OfferResponse,
    isArray: true,
  })
  offers: OfferResponse[];

  @ApiProperty({
    type: PaginationMetaResponse,
  })
  pagination: PaginationMetaResponse;
}
