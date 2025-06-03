import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty({
    description: 'The id of user.',
  })
  sub: number;

  @ApiProperty({
    description: 'The username of user.',
  })
  username: string;

  @ApiProperty({
    description: 'Serialized date of the moment when the token was issued.',
  })
  createdAt: number;
}
