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
import { SiteFeatureService } from './site-feature.service';
import { CreateSiteFeatureDto } from './dto/create-site-feature.dto';
import { UpdateSiteFeatureDto } from './dto/update-site-feature.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { Tenant } from '../auth/tenant.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('site-features')
@Controller('site-features')
export class SiteFeatureController {
  constructor(private readonly service: SiteFeatureService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create site feature' })
  create(@Body() dto: CreateSiteFeatureDto, @Tenant() tenant: string) {
    return this.service.create(dto, tenant);
  }

  @Get()
  @ApiOperation({ summary: 'List site features' })
  findAll(@Tenant() tenant: string) {
    return this.service.findAll(tenant);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site feature' })
  findOne(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.findOne(id, tenant);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update site feature' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSiteFeatureDto,
    @Tenant() tenant: string,
  ) {
    return this.service.update(id, dto, tenant);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete site feature' })
  remove(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.remove(id, tenant);
  }
}
