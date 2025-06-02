import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferDto {
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

  @ApiProperty({
    description: 'Tender id of offer.',
  })
  @IsNotEmpty()
  @IsNumber()
  tenderId: number;

  @ApiProperty({
    description: 'Author id of offer.',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
