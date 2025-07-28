import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { MedusaService } from './medusa.service';
import { SiteService } from '../site/site.service';

@ApiBearerAuth()
@ApiTags('site-commerce')
@Controller('sites/:siteId')
export class SiteCommerceController {
  constructor(
    private medusa: MedusaService,
    private sites: SiteService,
  ) {}

  private async assertOwnership(siteId: string, userId: string) {
    const site = await this.sites.findOne(siteId, userId);
    if (!site) throw new ForbiddenException('Unauthorized');
    return site;
  }

  @Get('products')
  @Roles(Role.site_owner)
  @ApiOperation({ summary: 'List products for site' })
  async listProducts(@Param('siteId') siteId: string, @Req() req: any) {
    const site = await this.assertOwnership(siteId, req.user.id);
    return this.medusa.listProducts(site.defaultSalesChannelId as string);
  }

  @Post('products')
  @Roles(Role.site_owner)
  @ApiOperation({ summary: 'Create product for site' })
  async createProduct(
    @Param('siteId') siteId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    await this.assertOwnership(siteId, req.user.id);
    return this.medusa.createProduct(body);
  }

  @Put('products/:id')
  @Roles(Role.site_owner)
  @ApiOperation({ summary: 'Update product' })
  async updateProduct(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    await this.assertOwnership(siteId, req.user.id);
    return this.medusa.updateProduct(id, body);
  }

  @Delete('products/:id')
  @Roles(Role.site_owner)
  @ApiOperation({ summary: 'Delete product' })
  async deleteProduct(
    @Param('siteId') siteId: string,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    await this.assertOwnership(siteId, req.user.id);
    return this.medusa.deleteProduct(id);
  }

  @Get('orders')
  @Roles(Role.site_owner)
  @ApiOperation({ summary: 'List orders for site' })
  async listOrders(@Param('siteId') siteId: string, @Req() req: any) {
    const site = await this.assertOwnership(siteId, req.user.id);
    return this.medusa.listOrders(site.defaultSalesChannelId as string);
  }

  @Get('orders/:orderId')
  @Roles(Role.site_owner)
  @ApiOperation({ summary: 'Get order' })
  async getOrder(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
    @Req() req: any,
  ) {
    await this.assertOwnership(siteId, req.user.id);
    return this.medusa.retrieveOrder(orderId);
  }
}
