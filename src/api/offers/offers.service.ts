import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from '../../common/requests/create-offer.dto';
import { UpdateOfferDto } from '../../common/requests/update-offer.dto';
import { OffersRepository } from '../../db/repositories/offers.repository';
import { QueryAllOffersDto } from '../../common/requests/query-all-offers.dto';

@Injectable()
export class OffersService {
  constructor(private offersRepository: OffersRepository) {}

  async createOffer(createOfferDto: CreateOfferDto) {
    return this.offersRepository.create(createOfferDto);
  }

  async getAll(queryDto: QueryAllOffersDto) {
    return this.offersRepository.findMany(queryDto);
  }

  async getById(offerId: number) {
    return this.offersRepository.findOne({
      id: offerId,
    });
  }

  async update(offerId: number, updateOfferDto: UpdateOfferDto) {
    return this.offersRepository.update(offerId, updateOfferDto);
  }

  async remove(offerId: number) {
    return this.offersRepository.delete(offerId);
  }
}
