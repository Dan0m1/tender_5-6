import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../../generated/prisma';
import { DatabaseUtils } from '../database.utils';
import { DbOffer } from '../entities/offer.entity';
import { CreateOfferDto } from '../../common/requests/create-offer.dto';
import { UpdateOfferDto } from '../../common/requests/update-offer.dto';
import { QueryAllOffersDto } from '../../common/requests/query-all-offers.dto';

@Injectable()
export class OffersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOfferDto): Promise<DbOffer> {
    const { tenderId, userId, ...payload } = data;
    return this.prisma.offer.create({
      data: {
        ...payload,
        tender: {
          connect: {
            id: tenderId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        tender: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateOfferDto): Promise<DbOffer> {
    return this.prisma.offer.update({
      where: {
        id,
      },
      data,
      include: {
        tender: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findMany(params: QueryAllOffersDto) {
    const args = this.buildFindManyArgs(params);
    const { page = 0, pageSize = 10 } = params;

    const total = await this.prisma.offer.count({ where: args.where });

    const offers = await this.prisma.offer.findMany({
      ...args,
      include: {
        tender: {
          select: {
            id: true,
            title: true,
            startingPrice: true,
            currentPrice: true,
            status: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return DatabaseUtils.convertPaginationData(offers, total, {
      page,
      pageSize,
    });
  }

  async findOneById(id: number) {
    return this.prisma.offer.findUnique({
      where: { id },
      include: {
        tender: {
          select: {
            id: true,
            title: true,
            startingPrice: true,
            currentPrice: true,
            status: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async findByTenderId(tenderId: number) {
    return this.prisma.offer.findMany({
      where: {
        tenderId: tenderId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        amount: 'asc',
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.offer.findMany({
      where: {
        userId: userId,
      },
      include: {
        tender: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: number) {
    return this.prisma.offer.delete({
      where: { id },
    });
  }

  async deleteMany(ids: number[]) {
    return this.prisma.offer.deleteMany({
      where: { id: { in: ids } },
    });
  }

  private buildFindManyArgs(params: QueryAllOffersDto): {
    where?: Prisma.OfferWhereInput;
  } {
    const {
      search,
      sort,
      order = 'asc',
      status,
      minAmount,
      maxAmount,
      tenderId,
      userId,
      page = 1,
      pageSize,
    } = params;

    let args: any = {};

    if (search) {
      args.where = {
        OR: [{ description: { contains: search, mode: 'insensitive' } }],
      };
    }
    if (status) {
      args.where = {
        ...args.where,
        status,
      };
    }
    if (minAmount) {
      args.where = {
        ...args.where,
        amount: { gte: minAmount },
      };
    }
    if (maxAmount) {
      args.where = {
        ...args.where,
        amount: {
          ...args.where?.amount,
          lte: maxAmount,
        },
      };
    }
    if (tenderId) {
      args.where = {
        ...args.where,
        tenderId,
      };
    }
    if (userId) {
      args.where = {
        ...args.where,
        userId,
      };
    }

    if (sort) {
      args = {
        ...args,
        ...DatabaseUtils.getSortArgs({ sort, order }, 'amount'),
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
