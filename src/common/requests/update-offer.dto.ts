import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { OfferStatus } from '../../generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfferDto {
  @ApiProperty({
    description: 'Amount of offer.',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({
    description: 'Description of offer.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status of offer.',
    enum: OfferStatus,
    enumName: 'OfferStatus',
    default: null,
  })
  @IsOptional()
  @IsEnum(OfferStatus)
  status?: OfferStatus;
}
