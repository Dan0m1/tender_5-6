import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';
import { PaginationMetaResponse } from './pagination-meta.response';

export class PaginatedUsersResponse {
  @ApiProperty({
    description: 'List of users.',
    type: UserResponse,
    isArray: true,
  })
  users: UserResponse[];

  @ApiProperty({
    description: 'Pagination meta.',
    type: PaginationMetaResponse,
  })
  pagination: PaginationMetaResponse;
}
