import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { Tenant } from '../auth/tenant.decorator';
import { SiteThemeService } from './site-theme.service';
import { CreateSiteThemeDto } from './dto/create-site-theme.dto';
import { UpdateSiteThemeDto } from './dto/update-site-theme.dto';

@ApiBearerAuth()
@ApiTags('site-themes')
@Controller('site-themes')
export class SiteThemeController {
  constructor(private readonly service: SiteThemeService) {}

  @Post()
  @Roles(Role.site_owner, Role.super_admin)
  @ApiOperation({ summary: 'Create site theme' })
  create(@Body() dto: CreateSiteThemeDto, @Tenant() tenant: string) {
    return this.service.create(dto, tenant);
  }

  @Get()
  @ApiOperation({ summary: 'List site themes' })
  findAll(@Tenant() tenant: string) {
    return this.service.findAll(tenant);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site theme' })
  findOne(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.findOne(id, tenant);
  }

  @Put(':id')
  @Roles(Role.site_owner, Role.super_admin)
  @ApiOperation({ summary: 'Update site theme' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSiteThemeDto,
    @Tenant() tenant: string,
  ) {
    return this.service.update(id, dto, tenant);
  }

  @Delete(':id')
  @Roles(Role.site_owner, Role.super_admin)
  @ApiOperation({ summary: 'Delete site theme' })
  remove(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.remove(id, tenant);
  }
}
