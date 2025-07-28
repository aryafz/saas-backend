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
import { SiteThemeService } from './site-theme.service';
import { CreateSiteThemeDto } from './dto/create-site-theme.dto';
import { UpdateSiteThemeDto } from './dto/update-site-theme.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('site-themes')
@Controller('site-themes')
export class SiteThemeController {
  constructor(private readonly service: SiteThemeService) {}

  @Post()
  @ApiOperation({ summary: 'Create site theme' })
  create(@Body() dto: CreateSiteThemeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List site themes' })
  findAll(@Query('siteId') siteId: string) {
    return this.service.findAll(siteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site theme' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update site theme' })
  update(@Param('id') id: string, @Body() dto: UpdateSiteThemeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site theme' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
