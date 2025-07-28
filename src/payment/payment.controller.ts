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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Tenant } from '../auth/tenant.decorator';

@ApiBearerAuth()
@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  @Roles(Role.site_owner, Role.super_admin)
  @ApiOperation({ summary: 'Create payment' })
  create(@Body() dto: CreatePaymentDto, @Tenant() tenant: string) {
    return this.service.create(tenant, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List payments' })
  findAll(@Tenant() tenant: string) {
    return this.service.findAll(tenant);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment' })
  findOne(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.findOne(tenant, id);
  }

  @Put(':id')
  @Roles(Role.site_owner, Role.super_admin)
  @ApiOperation({ summary: 'Update payment' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
    @Tenant() tenant: string,
  ) {
    return this.service.update(tenant, id, dto);
  }

  @Delete(':id')
  @Roles(Role.site_owner, Role.super_admin)
  @ApiOperation({ summary: 'Delete payment' })
  remove(@Param('id') id: string, @Tenant() tenant: string) {
    return this.service.remove(tenant, id);
  }
}
