import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        ...dto,
        transactionDate: dto.transactionDate
          ? new Date(dto.transactionDate)
          : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('Payment not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.payment.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Payment not found');
    }
  }
}
