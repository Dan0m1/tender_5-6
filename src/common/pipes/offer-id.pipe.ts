import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidIdException } from '../exceptions/invalid-id.exception';
import { OffersRepository } from '../../db/repositories/offers.repository';

@Injectable()
export class OfferByIdPipe implements PipeTransform<number, Promise<number>> {
  constructor(private offersRepository: OffersRepository) {}

  async transform(id: number) {
    const tender = await this.offersRepository.findOne({
      id,
    });
    if (!tender) {
      throw new InvalidIdException('Offer');
    }
    return id;
  }
}
