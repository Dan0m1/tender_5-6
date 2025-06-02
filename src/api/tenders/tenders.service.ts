import { Injectable } from '@nestjs/common';
import { TendersRepository } from '../../db/repositories/tenders.repository';
import { QueryAllTendersDto } from '../../common/requests/query-all-tenders.dto';
import { CreateTenderDto } from '../../common/requests/create-tender.dto';
import { UpdateTenderDto } from '../../common/requests/update-tender.dto';
import { DbTender } from '../../db/entities/tender.entity';

@Injectable()
export class TendersService {
  constructor(private tendersRepository: TendersRepository) {}

  async createTender(createTenderDto: CreateTenderDto): Promise<DbTender> {
    return this.tendersRepository.create(createTenderDto);
  }

  async getAll(queryDto: QueryAllTendersDto) {
    return this.tendersRepository.findMany(queryDto);
  }

  async getById(tenderId: number): Promise<DbTender | null> {
    return this.tendersRepository.findOne({
      id: tenderId,
    });
  }

  async update(
    tenderId: number,
    updateTenderDto: UpdateTenderDto,
  ): Promise<DbTender> {
    return this.tendersRepository.update(tenderId, updateTenderDto);
  }

  async remove(tenderId: number): Promise<DbTender> {
    return this.tendersRepository.delete(tenderId);
  }
}
