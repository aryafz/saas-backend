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
import { PlanFeatureService } from './plan-feature.service';
import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto';
import { UpdatePlanFeatureDto } from './dto/update-plan-feature.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('plan-features')
@Controller('plan-features')
export class PlanFeatureController {
  constructor(private readonly service: PlanFeatureService) {}

  @Post()
  @ApiOperation({ summary: 'Create plan feature' })
  create(@Body() dto: CreatePlanFeatureDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List plan features' })
  findAll(
    @Query('planId') planId?: string,
    @Query('featureId') featureId?: string,
  ) {
    return this.service.findAll({ planId, featureId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get plan feature' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update plan feature' })
  update(@Param('id') id: string, @Body() dto: UpdatePlanFeatureDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete plan feature' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
