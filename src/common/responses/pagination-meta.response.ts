import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaResponse {
  @ApiProperty({
    description: 'Total amount of tenders.',
  })
  amount: number;

  @ApiProperty({
    description: 'Total amount of tenders.',
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Total pages of tenders.',
  })
  totalPages: number;

  @ApiProperty({
    description: 'Current page of tenders.',
  })
  page: number;

  @ApiProperty({
    description: 'Page size of tenders.',
  })
  pageSize: number;

  @ApiProperty({
    description: 'Previous page size of tenders.',
  })
  prevPageSize: number;

  @ApiProperty({
    description: 'Next page size of tenders.',
  })
  nextPageSize: number;
}
