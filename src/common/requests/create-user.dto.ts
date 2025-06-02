import {IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from "class-validator";
import {UserRole} from "../../generated/prisma";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  balance?: number = 0;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  isActive?: boolean = true;
}
