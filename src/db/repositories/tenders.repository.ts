import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbTender } from '../entities/tender.entity';
import { QueryAllTendersDto } from '../../common/requests/query-all-tenders.dto';
import { DatabaseUtils } from '../database.utils';
import { Prisma } from '../../generated/prisma';
import { CreateTenderDto } from '../../common/requests/create-tender.dto';
import { UpdateTenderDto } from '../../common/requests/update-tender.dto';
import { TenderWhereInput } from '../../generated/prisma/models/Tender';

@Injectable()
export class TendersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenderDto): Promise<DbTender> {
    const { authorId, ...payload } = data;
    return this.prisma.tender.create({
      data: {
        ...payload,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, data: UpdateTenderDto): Promise<DbTender> {
    return this.prisma.tender.update({
      where: {
        id,
      },
      data,
    });
  }

  async findMany(params: QueryAllTendersDto) {
    const args = this.buildFindManyArgs(params);
    const { page = 0, pageSize = 10 } = params;

    const total = await this.prisma.tender.count({ where: args.where });

    const tenders = await this.prisma.tender.findMany({
      ...args,
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        winner: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: { offers: true },
        },
      },
    });

    return DatabaseUtils.convertPaginationData(tenders, total, {
      page,
      pageSize,
    });
  }

  async findOne(where: TenderWhereInput): Promise<DbTender | null> {
    return this.prisma.tender.findFirst({
      where,
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        winner: {
          select: {
            id: true,
            username: true,
          },
        },
        offers: true,
      },
    });
  }

  async delete(id: number): Promise<DbTender> {
    return this.prisma.tender.delete({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        winner: {
          select: {
            id: true,
            username: true,
          },
        },
        offers: true,
      },
    });
  }

  async deleteMany(ids: number[]) {
    return this.prisma.tender.deleteMany({
      where: { id: { in: ids } },
    });
  }

  private buildFindManyArgs(params: QueryAllTendersDto): {
    where?: Prisma.TenderWhereInput;
  } {
    let {
      search,
      sort,
      order = 'asc',
      status,
      minPrice,
      maxPrice,
      authorId,
      winnerId,
      page = 1,
      pageSize = 10,
    } = params;

    page = +page;
    pageSize = +pageSize;

    let args: any = {
      where: {},
    };

    if (search) {
      args.where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) {
      args.where.status = status;
    }
    if (minPrice) {
      args.where.startingPrice = { gte: +minPrice };
    }
    if (maxPrice) {
      args.where.startingPrice = {
        ...args.where.startingPrice,
        lte: +maxPrice,
      };
    }
    if (authorId) {
      args.where.authorId = +authorId;
    }
    if (winnerId) {
      args.where.winnerId = +winnerId;
    }

    if (sort) {
      args = {
        ...args,
        ...DatabaseUtils.getSortArgs({ sort, order }, 'startingPrice'),
      };
    }

    if (page && pageSize) {
      args = {
        ...args,
        ...DatabaseUtils.getPaginationArgs({ page, pageSize }),
      };
    }

    return args;
  }
}
