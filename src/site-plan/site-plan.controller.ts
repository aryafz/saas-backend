import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SitePlanService } from './site-plan.service';
import { CreateSitePlanDto } from './dto/create-site-plan.dto';
import { UpdateSitePlanDto } from './dto/update-site-plan.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('site-plans')
@Controller('site-plans')
export class SitePlanController {
  constructor(private readonly service: SitePlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create site plan' })
  create(@Body() dto: CreateSitePlanDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List site plans' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site plan' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update site plan' })
  update(@Param('id') id: string, @Body() dto: UpdateSitePlanDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site plan' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
