import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateOfferDto } from '../requests/create-offer.dto';
import { UserByIdPipe } from './user-id.pipe';
import { TenderByIdPipe } from './tender-id.pipe';

@Injectable()
export class OfferCreatePipe
  implements PipeTransform<CreateOfferDto, Promise<CreateOfferDto>>
{
  constructor(
    private userByIdPipe: UserByIdPipe,
    private tenderByIdPipe: TenderByIdPipe,
  ) {}

  async transform(dto: CreateOfferDto) {
    await this.userByIdPipe.transform(dto.userId);
    await this.tenderByIdPipe.transform(dto.tenderId);
    return dto;
  }
}
