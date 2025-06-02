import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TendersService } from './tenders.service';
import { QueryAllTendersDto } from '../../common/requests/query-all-tenders.dto';
import { PaginatedTendersResponse } from '../../common/responses/paginated-tenders.response';
import { CreateTenderDto } from '../../common/requests/create-tender.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  CreateTenderResponseExample,
  TenderResponse,
} from '../../common/responses/tender.response';
import { DbTender } from '../../db/entities/tender.entity';
import { TenderCreatePipe } from '../../common/pipes/tender-create.pipe';
import { UpdateTenderDto } from '../../common/requests/update-tender.dto';
import { TenderByIdPipe } from '../../common/pipes/tender-id.pipe';
import { TenderWithOffersResponse } from '../../common/responses/tender-with-offers.response';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tenders')
@Controller('tenders')
export class TendersController {
  constructor(
    private readonly tendersService: TendersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiOperation({
    summary: 'Create new tender',
  })
  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: TenderResponse,
    example: CreateTenderResponseExample,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      "title" must be a string
      "description" must be a string
      "startingPrice" must be a number conforming to the specified constraints
      "currentPrice" must be a number conforming to the specified constraints
      "startDate" must be a date string
      "endDate" must be a date string\n
    InvalidIdException:
      "authorId" - User with such id was not found
    `,
  })
  async create(
    @Body(TenderCreatePipe) createTenderDto: CreateTenderDto,
  ): Promise<TenderResponse> {
    const tender: DbTender =
      await this.tendersService.createTender(createTenderDto);
    return this.mapper.map(tender, DbTender, TenderResponse);
  }

  @ApiOperation({
    summary: 'Get all tenders',
  })
  @Get()
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: PaginatedTendersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
    "page" must be a number conforming to the specified constraints
    "pageSize" must be a number conforming to the specified constraints
    "search" must be a string
    "sort" must be a string
    "order" must be one of ['asc','desc']
    "status" must be one of TenderStatus enum values
    "minPrice" must be a number conforming to the specified constraints
    "maxPrice" must be a number conforming to the specified constraints
    "authorId" must be a number conforming to the specified constraints (User)
    "winnerId" must be a number conforming to the specified constraints (User)
    `,
  })
  async getAll(
    @Query() query: QueryAllTendersDto,
  ): Promise<PaginatedTendersResponse> {
    const tenders = await this.tendersService.getAll(query);
    const tendersResponse: TenderResponse[] = this.mapper.mapArray(
      tenders.data,
      DbTender,
      TenderResponse,
    );

    return {
      tenders: tendersResponse,
      pagination: tenders.meta,
    };
  }

  @ApiOperation({
    summary: 'Get tender by id',
  })
  @ApiParam({
    name: 'tenderId',
    description: 'Tender id',
    type: Number,
  })
  @Get('/:tenderId')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: TenderWithOffersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "tenderId" - Tender with such id was not found
    `,
  })
  async getById(
    @Param('tenderId', TenderByIdPipe) tenderId: number,
  ): Promise<TenderWithOffersResponse> {
    const tender = await this.tendersService.getById(tenderId);
    return this.mapper.map(tender, DbTender, TenderWithOffersResponse);
  }

  @ApiOperation({
    summary: 'Update tender',
  })
  @ApiParam({
    name: 'tenderId',
    description: 'Tender id',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: TenderResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "tenderId" - Tender with such id was not found
    `,
  })
  @Patch('/:tenderId')
  async update(
    @Param('tenderId', TenderByIdPipe) tenderId: number,
    @Body() updateTenderDto: UpdateTenderDto,
  ) {
    const tender = await this.tendersService.update(tenderId, updateTenderDto);
    return this.mapper.map(tender, DbTender, TenderResponse);
  }

  @ApiOperation({
    summary: 'Delete tender',
  })
  @ApiParam({
    name: 'tenderId',
    description: 'Tender id',
    type: Number,
  })
  @ApiOkResponse({
    description:
      "The record and related offer's records have been successfully deleted.",
    type: TenderWithOffersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "tenderId" - Tender with such id was not found
    `,
  })
  // Do not use to deactivate tender
  @Delete('/:tenderId')
  async remove(@Param('tenderId', TenderByIdPipe) tenderId: number) {
    const tender = await this.tendersService.remove(tenderId);
    return this.mapper.map(tender, DbTender, TenderWithOffersResponse);
  }
}
