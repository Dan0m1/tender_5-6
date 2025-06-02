import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserResponse } from 'src/common/responses/user.response';
import { CreateUserDto } from '../../common/requests/create-user.dto';
import { DbUser } from '../../db/entities/user.entity';
import { QueryAllUsersDto } from '../../common/requests/query-all-users.dto';
import { UserByIdPipe } from 'src/common/pipes/user-id.pipe';
import { UpdateUserDto } from '../../common/requests/update-user.dto';
import { UserCreatePipe } from '../../common/pipes/user-create.pipe';
import { PaginatedUsersResponse } from '../../common/responses/paginated-users-response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiOperation({
    summary: 'Create new user',
  })
  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      
    `,
  })
  async create(
    @Body(UserCreatePipe) createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user: DbUser = await this.usersService.createUser(createUserDto);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiOperation({
    summary: 'Get all users',
  })
  @Get()
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: PaginatedUsersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
    `,
  })
  async getAll(
    @Query() query: QueryAllUsersDto,
  ): Promise<PaginatedUsersResponse> {
    const users = await this.usersService.getAll(query);

    const usersResponse: UserResponse[] = this.mapper.mapArray(
      users.data,
      DbUser,
      UserResponse,
    );

    return {
      users: usersResponse,
      pagination: users.meta,
    };
  }

  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    type: Number,
  })
  @Get('/:userId')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "userId" - User with such id was not found
    `,
  })
  async getById(
    @Param('userId', UserByIdPipe) userId: number,
  ): Promise<UserResponse> {
    const user = await this.usersService.getById(userId);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "userId" - User with such id was not found
    `,
  })
  @Patch('/:userId')
  async update(
    @Param('userId', UserByIdPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user: DbUser = await this.usersService.update(userId, updateUserDto);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "userId" - User with such id was not found
    `,
  })
  // Do not use to deactivate user
  @Delete('/:userId')
  async remove(@Param('userId', UserByIdPipe) userId: number) {
    const user: DbUser = await this.usersService.remove(userId);
    return this.mapper.map(user, DbUser, UserResponse);
  }
}
