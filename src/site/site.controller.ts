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
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { Tenant } from '../auth/tenant.decorator';

@ApiTags('sites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sites')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create site' })
  create(@Body() dto: CreateSiteDto, @Tenant() tenant: string) {
    return this.siteService.create(dto, tenant);
  }

  @Get()
  @ApiOperation({ summary: 'List sites' })
  findAll(@Tenant() tenant: string) {
    return this.siteService.findAll(tenant);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site' })
  findOne(@Param('id') id: string, @Tenant() tenant: string) {
    return this.siteService.findOne(id, tenant);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update site' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSiteDto,
    @Tenant() tenant: string,
  ) {
    return this.siteService.update(id, dto, tenant);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete site' })
  remove(@Param('id') id: string, @Tenant() tenant: string) {
    return this.siteService.remove(id, tenant);
  }
}
