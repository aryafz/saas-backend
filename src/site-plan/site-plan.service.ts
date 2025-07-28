import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSitePlanDto } from './dto/create-site-plan.dto';
import { UpdateSitePlanDto } from './dto/update-site-plan.dto';

@Injectable()
export class SitePlanService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSitePlanDto) {
    return this.prisma.sitePlan.create({ data: dto });
  }

  findAll() {
    return this.prisma.sitePlan.findMany({ include: { payments: true } });
  }

  async findOne(id: string) {
    const sp = await this.prisma.sitePlan.findUnique({
      where: { id },
      include: { payments: true },
    });
    if (!sp) throw new NotFoundException('SitePlan not found');
    return sp;
  }

  async update(id: string, dto: UpdateSitePlanDto) {
    try {
      return await this.prisma.sitePlan.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('SitePlan not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.sitePlan.delete({ where: { id } });
    } catch {
      throw new NotFoundException('SitePlan not found');
    }
  }
}
