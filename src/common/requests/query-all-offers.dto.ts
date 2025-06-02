import { QueryAllDto } from './query-all.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OfferStatus } from '../../generated/prisma';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllOffersDto extends QueryAllDto {
  @ApiPropertyOptional({
    description: 'Status of offer to query.',
    enum: OfferStatus,
    enumName: 'OfferStatus',
  })
  @IsOptional()
  @IsEnum(OfferStatus)
  status?: OfferStatus;

  @ApiPropertyOptional({
    description: 'Min amount of offer to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minAmount?: number;

  @ApiPropertyOptional({
    description: 'Max amount of offer to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxAmount?: number;

  @ApiPropertyOptional({
    description: 'Tender of offer to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tenderId?: number;

  @ApiPropertyOptional({
    description: 'Author of offer to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId?: number;
}
