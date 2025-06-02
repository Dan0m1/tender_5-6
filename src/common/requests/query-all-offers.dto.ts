import { QueryAllDto } from './query-all.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OfferStatus } from '../../generated/prisma';
import { Type } from 'class-transformer';

export class QueryAllOffersDto extends QueryAllDto {
  @IsOptional()
  @IsEnum(OfferStatus)
  status?: OfferStatus;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minAmount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxAmount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tenderId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userId?: number;
}
