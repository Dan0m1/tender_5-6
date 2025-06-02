import { IsEnum, IsOptional } from 'class-validator';
import { QueryAllDto } from './query-all.dto';
import { UserRole } from '../../generated/prisma';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllUsersDto extends QueryAllDto {
  @ApiPropertyOptional({
    description: 'Role of user to query.',
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Is user active or not.',
    default: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;
}
