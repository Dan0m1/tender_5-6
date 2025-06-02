import { Injectable, PipeTransform } from '@nestjs/common';
import { TendersRepository } from '../../db/repositories/tenders.repository';
import { InvalidIdException } from '../exceptions/invalid-id.exception';

@Injectable()
export class TenderByIdPipe implements PipeTransform<number, Promise<number>> {
  constructor(private tendersRepository: TendersRepository) {}

  async transform(id: number) {
    const tender = await this.tendersRepository.findOne({
      id,
    });
    if (!tender) {
      throw new InvalidIdException('Tender');
    }
    return id;
  }
}
