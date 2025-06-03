import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../../generated/prisma';
import { DatabaseUtils } from '../database.utils';
import { DbUser } from 'src/db/entities/user.entity';
import { CreateUserDto } from '../../common/requests/create-user.dto';
import { UpdateUserDto } from '../../common/requests/update-user.dto';
import { QueryAllUsersDto } from '../../common/requests/query-all-users.dto';
import { UserWhereInput } from '../../generated/prisma/models/User';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<DbUser> {
    return this.prisma.user.create({
      data,
      omit: {
        password: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<DbUser> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      omit: {
        password: true,
      },
    });
  }

  async findMany(params: QueryAllUsersDto) {
    const args = this.buildFindManyArgs(params);
    const { page = 0, pageSize = 10 } = params;

    const total = await this.prisma.user.count({ where: args.where });

    const users = await this.prisma.user.findMany({
      ...args,
      include: {
        createdTenders: true,
        wonTenders: true,
        offers: true,
      },
      omit: {
        password: true,
      },
    });
    return DatabaseUtils.convertPaginationData(users, total, {
      page,
      pageSize,
    });
  }

  async findOne(where: UserWhereInput): Promise<DbUser | null> {
    return this.prisma.user.findFirst({
      where,
      include: {
        createdTenders: true,
        wonTenders: true,
        offers: true,
      },
      omit: {
        password: true,
      },
    });
  }

  async findByUsernameWithPassword(username: string): Promise<DbUser | null> {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        role: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  private buildFindManyArgs(params: QueryAllUsersDto): {
    where?: Prisma.UserWhereInput;
  } {
    const {
      search,
      sort,
      order = 'asc',
      role,
      isActive,
      page = 1,
      pageSize,
    } = params;

    let args: any = {};

    if (search) {
      args.where = {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }
    if (role) {
      args.where = {
        ...args.where,
        role,
      };
    }
    if (isActive) {
      args.where = {
        ...args.where,
        isActive,
      };
    }

    if (sort) {
      args = {
        ...args,
        ...DatabaseUtils.getSortArgs({ sort, order }, 'username'),
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
