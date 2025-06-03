import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegistrationCredentialsDto {
  @ApiProperty({
    description: 'Username of user to create.',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password of user to create.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
