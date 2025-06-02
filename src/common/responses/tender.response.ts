import { AutoMap } from '@automapper/classes';
import { TenderStatus } from '../../generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class TenderResponse {
  @ApiProperty({
    description: 'The id of tender.',
  })
  @AutoMap()
  id: number;

  @ApiProperty({
    description: 'The author (user) id of tender.',
  })
  @AutoMap()
  authorId: number;

  @ApiProperty({
    description: 'The winner (user) id of tender.',
  })
  @AutoMap()
  winnerId: number | null;

  @ApiProperty({
    description: 'The title of tender.',
  })
  @AutoMap()
  title: string;

  @ApiProperty({
    description: 'The description of tender.',
  })
  @AutoMap()
  description: string | null;

  @ApiProperty({
    description: 'The starting price of tender.',
  })
  @AutoMap()
  startingPrice: number;

  @ApiProperty({
    description: 'The current price of tender.',
  })
  @AutoMap()
  currentPrice: number;

  @ApiProperty({
    description: 'The status of tender.',
    enum: TenderStatus,
    enumName: 'TenderStatus',
  })
  @AutoMap(() => String)
  status: TenderStatus;

  @ApiProperty({
    description: 'The start date of tender.',
  })
  @AutoMap()
  startDate: Date | null;

  @ApiProperty({
    description: 'The end date of tender.',
  })
  @AutoMap()
  endDate: Date | null;

  @ApiProperty({
    description: 'The date when the tender was created.',
  })
  @AutoMap()
  createdAt: Date;
}

export const CreateTenderResponseExample = {
  id: 1,
  title: 'Test',
  description: 'Test',
  startingPrice: 100,
  currentPrice: 100,
  status: 'ACTIVE',
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
};
