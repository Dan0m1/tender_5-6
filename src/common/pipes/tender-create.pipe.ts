import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateTenderDto } from '../requests/create-tender.dto';
import { UserByIdPipe } from './user-id.pipe';

@Injectable()
export class TenderCreatePipe
  implements PipeTransform<CreateTenderDto, Promise<CreateTenderDto>>
{
  constructor(private userByIdPipe: UserByIdPipe) {}

  async transform(value: CreateTenderDto) {
    if (!value.currentPrice) {
      value.currentPrice = value.startingPrice;
    }
    if (value.authorId) {
      await this.userByIdPipe.transform(value.authorId);
    }
    return value;
  }
}
