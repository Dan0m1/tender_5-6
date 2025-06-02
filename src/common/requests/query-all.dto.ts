import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllDto {
  @ApiPropertyOptional({
    description: 'Page number to query.',
    default: 0,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    description: 'Page size to query.',
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  pageSize?: number;

  @ApiPropertyOptional({
    description: 'Search string to query.',
    default: null,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sort string to query.',
    default: null,
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Order string to query.',
    default: 'asc',
  })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc';
}

export class SortDTO {
  sort: string;
  order: 'asc' | 'desc';
}

export class PaginationDTO {
  page: number;
  pageSize: number;
}
