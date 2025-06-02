import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OfferStatus } from '../../generated/prisma';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsOptional()
  @IsEnum(OfferStatus)
  status?: OfferStatus;
}
