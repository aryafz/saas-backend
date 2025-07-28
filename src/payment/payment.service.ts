import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(siteId: string, dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        siteId,
        amountCents: dto.amountCents,
        currency: dto.currency ?? 'USD',
        status: dto.status ?? 'pending',
        externalId: dto.externalId,
        invoiceNo: dto.invoiceNo,
      },
    });
  }

  findAll(siteId: string) {
    return this.prisma.payment.findMany({ where: { siteId } });
  }

  async findOne(siteId: string, id: string) {
    const row = await this.prisma.payment.findFirst({ where: { id, siteId } });
    if (!row) throw new NotFoundException('Payment not found');
    return row;
  }

  async update(siteId: string, id: string, dto: Partial<CreatePaymentDto>) {
    const result = await this.prisma.payment.updateMany({
      where: { id, siteId },
      data: {
        amountCents: dto.amountCents,
        currency: dto.currency,
        status: dto.status,
        externalId: dto.externalId,
        invoiceNo: dto.invoiceNo,
      },
    });
    if (result.count === 0) throw new NotFoundException('Payment not found');
    return this.findOne(siteId, id);
  }

  async remove(siteId: string, id: string) {
    const result = await this.prisma.payment.deleteMany({
      where: { id, siteId },
    });
    if (result.count === 0) throw new NotFoundException('Payment not found');
    return { success: true };
  }
}
