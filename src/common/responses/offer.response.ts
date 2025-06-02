import { AutoMap } from '@automapper/classes';
import { OfferStatus } from '../../generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OfferResponse {
  @ApiProperty({
    description: 'The id of offer.',
  })
  @AutoMap()
  id: number;

  @ApiProperty({
    description: 'The amount of offer.',
  })
  @AutoMap()
  amount: number;

  @ApiPropertyOptional({
    description: 'The description of offer.',
  })
  @AutoMap()
  description?: string | null;

  @ApiProperty({
    description: 'The status of offer.',
    enum: OfferStatus,
    enumName: 'OfferStatus',
  })
  @AutoMap(() => String)
  status: OfferStatus;

  @ApiProperty({
    description: 'The tender id of offer.',
  })
  @AutoMap()
  tenderId: number;

  @ApiProperty({
    description: 'The user id of offer.',
  })
  @AutoMap()
  userId: number;

  @ApiProperty({
    description: 'The date when the offer was created.',
  })
  @AutoMap()
  createdAt: Date;
}
