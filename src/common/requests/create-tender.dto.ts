import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTenderDto {
  @ApiProperty({
    description: 'Title of tender to create.',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of tender to create.',
    default: null,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Starting price of tender to create.',
  })
  @IsNumber()
  @IsPositive()
  startingPrice: number;

  @ApiPropertyOptional({
    description: 'Current price of tender to create.',
    default: null,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  currentPrice?: number;

  @ApiPropertyOptional({
    description: 'Start Date of tender to create.',
    default: null,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End Date of tender to create.',
    default: null,
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({
    description: 'Author of tender to create.',
  })
  @IsNumber()
  authorId: number;
}
