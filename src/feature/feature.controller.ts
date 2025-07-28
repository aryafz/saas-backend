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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('features')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @Roles(Role.super_admin)
  @ApiOperation({ summary: 'Create feature' })
  create(@Body() dto: CreateFeatureDto) {
    return this.featureService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List features' })
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feature' })
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.super_admin)
  @ApiOperation({ summary: 'Update feature' })
  update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return this.featureService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.super_admin)
  @ApiOperation({ summary: 'Delete feature' })
  remove(@Param('id') id: string) {
    return this.featureService.remove(id);
  }
}
