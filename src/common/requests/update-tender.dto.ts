import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TenderStatus } from '../../generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTenderDto {
  @ApiProperty({
    description: 'Title of tender to update.',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of tender to update.',
    default: null,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Starting price of tender to update.',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  startingPrice?: number;

  @ApiPropertyOptional({
    description: 'Current price of tender to update.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  currentPrice?: number;

  @ApiPropertyOptional({
    description: 'Start Date of tender to update.',
    default: null,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End Date of tender to update.',
    default: null,
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Status of tender to update.',
    enum: TenderStatus,
    enumName: 'TenderStatus',
  })
  @IsOptional()
  @IsEnum(TenderStatus)
  status?: TenderStatus;
}
