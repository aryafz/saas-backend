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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sites')
@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  create(@Body() dto: CreateSiteDto) {
    return this.siteService.create(dto);
  }

  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSiteDto) {
    return this.siteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(id);
  }
}
