import { InjectMapper } from '@automapper/nestjs';
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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { Mapper } from '@automapper/core';
import { OfferResponse } from 'src/common/responses/offer.response';
import { CreateOfferDto } from '../../common/requests/create-offer.dto';
import { DbOffer } from '../../db/entities/offer.entity';
import { QueryAllOffersDto } from '../../common/requests/query-all-offers.dto';
import { UpdateOfferDto } from '../../common/requests/update-offer.dto';
import { OfferByIdPipe } from '../../common/pipes/offer-id.pipe';
import { OfferCreatePipe } from '../../common/pipes/offer-create.pipe';
import { PaginatedOffersResponse } from '../../common/responses/paginated-offers.response';
import { OfferWithUserAndTenderResponse } from '../../common/responses/offer-with-user-and-tender.response';

@ApiTags('Offers')
@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiOperation({
    summary: 'Create new offer',
  })
  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: OfferResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      
    InvalidIdException:
      "userId" - User with such id was not found
      "offerId" - Offer with such id was not found
    `,
  })
  async create(
    @Body(OfferCreatePipe) createOfferDto: CreateOfferDto,
  ): Promise<OfferResponse> {
    const offer: DbOffer = await this.offersService.createOffer(createOfferDto);
    return this.mapper.map(offer, DbOffer, OfferResponse);
  }

  @ApiOperation({
    summary: 'Get all offers',
  })
  @Get()
  @ApiOkResponse({
    description: 'The records has been successfully retrieved.',
    type: PaginatedOffersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
    `,
  })
  async getAll(
    @Query() query: QueryAllOffersDto,
  ): Promise<PaginatedOffersResponse> {
    const offers = await this.offersService.getAll(query);
    const offersResponse: OfferResponse[] = this.mapper.mapArray(
      offers.data,
      DbOffer,
      OfferResponse,
    );

    return {
      offers: offersResponse,
      pagination: offers.meta,
    };
  }

  @ApiOperation({
    summary: 'Get offer by id',
  })
  @ApiParam({
    name: 'offerId',
    description: 'Offer id',
    type: Number,
  })
  @Get('/:offerId')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: OfferWithUserAndTenderResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "offerId" - Offer with such id was not found
    `,
  })
  async getById(
    @Param('offerId', OfferByIdPipe) offerId: number,
  ): Promise<OfferWithUserAndTenderResponse> {
    const offer = await this.offersService.getById(offerId);
    return this.mapper.map(offer, DbOffer, OfferWithUserAndTenderResponse);
  }

  @ApiOperation({
    summary: 'Update offer',
  })
  @ApiParam({
    name: 'offerId',
    description: 'Offer id',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: OfferResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "offerId" - Offer with such id was not found
    `,
  })
  @Patch('/:offerId')
  async update(
    @Param('offerId', OfferByIdPipe) offerId: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    const offer = await this.offersService.update(offerId, updateOfferDto);
    return this.mapper.map(offer, DbOffer, OfferResponse);
  }

  @ApiOperation({
    summary: 'Delete offer',
  })
  @ApiParam({
    name: 'offerId',
    description: 'Offer id',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: OfferResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidIdException:
      "offerId" - Offer with such id was not found
    `,
  })
  // Do not use to deactivate offer
  @Delete('/:offerId')
  async remove(@Param('offerId', OfferByIdPipe) offerId: number) {
    const offer: DbOffer = await this.offersService.remove(offerId);
    return this.mapper.map(offer, DbOffer, OfferResponse);
  }
}
