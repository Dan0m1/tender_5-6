import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../generated/prisma';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Password of user to update.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'Email of user to update.',
    default: null,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Balance of user to update.',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  balance?: number = 0;

  @ApiPropertyOptional({
    description: 'Role of user to update.',
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Is user active or not.',
    default: true,
  })
  @IsOptional()
  isActive?: boolean = true;
}
