import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('sites')
@ApiBearerAuth()
@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  @ApiOperation({ summary: 'Create site' })
  create(@Body() dto: CreateSiteDto) {
    return this.siteService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List sites' })
  findAll() {
    return this.siteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site' })
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update site' })
  update(@Param('id') id: string, @Body() dto: UpdateSiteDto) {
    return this.siteService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site' })
  remove(@Param('id') id: string) {
    return this.siteService.remove(id);
  }
}
