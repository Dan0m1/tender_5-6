import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'The id of user.',
  })
  id: number;

  @ApiProperty({
    description: 'The username of user.',
  })
  username: string;

  @ApiPropertyOptional({
    description: 'The email of user.',
  })
  email: string | null;

  @ApiProperty({
    description: 'The balance of user.',
  })
  balance: number;

  @ApiProperty({
    description: 'The role of user.',
  })
  role: string;

  @ApiProperty({
    description: 'If the user is active or not.',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The date when the user was created.',
  })
  createdAt: Date;
}
