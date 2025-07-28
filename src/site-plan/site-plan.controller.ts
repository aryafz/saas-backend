import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SitePlanService } from './site-plan.service';
import { CreateSitePlanDto } from './dto/create-site-plan.dto';
import { UpdateSitePlanDto } from './dto/update-site-plan.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { Tenant } from '../auth/tenant.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('site-plans')
@Controller('site-plans')
export class SitePlanController {
  constructor(private readonly service: SitePlanService) {}

  @Post()
  @Roles(Role.super_admin)
  @ApiOperation({ summary: 'Create site plan' })
  create(@Body() dto: CreateSitePlanDto, @Tenant() tenant: string) {
    return this.service.create(dto, tenant);
  }

  @Get()
  @ApiOperation({ summary: 'List site plans' })
  findAll(@Tenant() tenant: string) {
    return this.service.findAll(tenant);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site plan' })
  findOne(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.findOne(id, tenant);
  }

  @Patch(':id')
  @Roles(Role.super_admin)
  @ApiOperation({ summary: 'Update site plan' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSitePlanDto,
    @Tenant() tenant: string,
  ) {
    return this.service.update(id, dto, tenant);
  }

  @Delete(':id')
  @Roles(Role.super_admin)
  @ApiOperation({ summary: 'Delete site plan' })
  remove(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.remove(id, tenant);
  }
}
