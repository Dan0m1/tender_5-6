import { PaginationMetaResponse } from './pagination-meta.response';
import { TenderResponse } from './tender.response';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedTendersResponse {
  @ApiProperty({
    type: TenderResponse,
    isArray: true,
  })
  tenders: TenderResponse[];

  @ApiProperty({
    type: PaginationMetaResponse,
  })
  pagination: PaginationMetaResponse;
}
