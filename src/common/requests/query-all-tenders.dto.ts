import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TenderStatus } from '../../generated/prisma';
import { QueryAllDto } from './query-all.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllTendersDto extends QueryAllDto {
  @ApiPropertyOptional({
    description: 'Status of tender to query.',
    enum: TenderStatus,
    enumName: 'TenderStatus',
  })
  @IsOptional()
  @IsEnum(TenderStatus)
  status?: TenderStatus;

  @ApiPropertyOptional({
    description: 'Min price of tender to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Max price of tender to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Author of tender to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  authorId?: number;

  @ApiPropertyOptional({
    description: 'Winner of tender to query.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  winnerId?: number;
}
