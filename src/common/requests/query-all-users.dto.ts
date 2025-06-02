import { IsEnum, IsOptional } from 'class-validator';
import { QueryAllDto } from './query-all.dto';
import { UserRole } from '../../generated/prisma';
import { Transform } from 'class-transformer';

export class QueryAllUsersDto extends QueryAllDto {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;
}
