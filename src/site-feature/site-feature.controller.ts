import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { SiteFeatureService } from './site-feature.service';
import { CreateSiteFeatureDto } from './dto/create-site-feature.dto';
import { UpdateSiteFeatureDto } from './dto/update-site-feature.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('site-features')
@Controller('site-features')
export class SiteFeatureController {
  constructor(private readonly service: SiteFeatureService) {}

  @Post()
  @ApiOperation({ summary: 'Create site feature' })
  create(@Body() dto: CreateSiteFeatureDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List site features' })
  findAll(@Query('siteId') siteId: string) {
    return this.service.findAll(siteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site feature' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update site feature' })
  update(@Param('id') id: string, @Body() dto: UpdateSiteFeatureDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site feature' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
