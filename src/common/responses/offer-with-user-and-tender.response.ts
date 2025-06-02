import { ApiProperty } from '@nestjs/swagger';
import { OfferResponse } from './offer.response';
import { TenderResponse } from './tender.response';
import { UserResponse } from './user.response';

export class OfferWithUserAndTenderResponse extends OfferResponse {
  @ApiProperty({
    description: 'Tender related to this offer.',
    type: TenderResponse,
  })
  tender: TenderResponse;

  @ApiProperty({
    description: 'User related to this offer (Author of offer).',
    type: UserResponse,
  })
  user: UserResponse;
}
