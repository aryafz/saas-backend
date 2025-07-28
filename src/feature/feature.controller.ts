import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('features')
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  create(@Body() dto: CreateFeatureDto) {
    return this.featureService.create(dto);
  }

  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return this.featureService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureService.remove(id);
  }
}
