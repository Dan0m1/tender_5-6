import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { UserRole } from '../../generated/prisma';

export class UserResponse {
  @ApiProperty({
    description: 'The id of user.',
  })
  @AutoMap()
  id: number;

  @ApiProperty({
    description: 'The username of user.',
  })
  @AutoMap()
  username: string;

  @ApiPropertyOptional({
    description: 'The email of user.',
  })
  @AutoMap()
  email: string | null;

  @ApiProperty({
    description: 'The balance of user.',
  })
  @AutoMap()
  balance: number;

  @ApiProperty({
    description: 'The role of user.',
  })
  @AutoMap(() => String)
  role: UserRole;

  @ApiProperty({
    description: 'If the user is active or not.',
  })
  @AutoMap()
  isActive: boolean;

  @ApiProperty({
    description: 'The date when the user was created.',
  })
  @AutoMap()
  createdAt: Date;
}
