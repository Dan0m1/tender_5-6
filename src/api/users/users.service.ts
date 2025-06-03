import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../common/requests/create-user.dto';
import { UsersRepository } from 'src/db/repositories/users.repository';
import { UpdateUserDto } from '../../common/requests/update-user.dto';
import { QueryAllUsersDto } from 'src/common/requests/query-all-users.dto';
import { DbUser, UserEntity } from '../../db/entities/user.entity';
import { UserRole } from '../../generated/prisma';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto, initiator: UserEntity) {
    const initiatorUser = await this.usersRepository.findOne({
      id: initiator.id,
    });

    if (this.canDoAdminRelatedActions(initiatorUser)) {
      return this.usersRepository.create(createUserDto);
    }

    throw new UnauthorizedException("You don't have permission to do that.");
  }

  async getAll(queryDto: QueryAllUsersDto, initiator: UserEntity) {
    const initiatorUser = await this.usersRepository.findOne({
      id: initiator.id,
    });

    if (this.canDoAdminRelatedActions(initiatorUser)) {
      return this.usersRepository.findMany(queryDto);
    }

    throw new UnauthorizedException("You don't have permission to do that.");
  }

  async getById(userId: number, initiator: UserEntity) {
    const initiatorUser = await this.usersRepository.findOne({
      id: initiator.id,
    });

    if (
      this.canDoAdminRelatedActions(initiatorUser) ||
      this.canDoSelfRelatedActions(userId, initiatorUser)
    ) {
      return this.usersRepository.findOne({
        id: userId,
      });
    }

    throw new UnauthorizedException("You don't have permission to do that.");
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
    initiator: UserEntity,
  ) {
    const initiatorUser = await this.usersRepository.findOne({
      id: initiator.id,
    });

    if (
      this.canDoAdminRelatedActions(initiatorUser) ||
      this.canDoSelfRelatedActions(userId, initiatorUser)
    ) {
      return this.usersRepository.update(userId, updateUserDto);
    }

    throw new UnauthorizedException("You don't have permission to do that.");
  }

  async remove(userId: number, initiator: UserEntity) {
    const initiatorUser = await this.usersRepository.findOne({
      id: initiator.id,
    });

    if (
      this.canDoAdminRelatedActions(initiatorUser) ||
      this.canDoSelfRelatedActions(userId, initiatorUser)
    ) {
      return this.usersRepository.delete(userId);
    }

    throw new UnauthorizedException("You don't have permission to do that.");
  }

  private canDoAdminRelatedActions(initiator: DbUser | null) {
    return (
      initiator &&
      (initiator.role === UserRole.ADMIN ||
        initiator.role === UserRole.MODERATOR)
    );
  }

  private canDoSelfRelatedActions(
    userIdToCheck: number,
    initiator: DbUser | null,
  ) {
    return initiator && initiator.id === userIdToCheck;
  }
}
