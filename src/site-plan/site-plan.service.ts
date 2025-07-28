import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSitePlanDto } from './dto/create-site-plan.dto';
import { UpdateSitePlanDto } from './dto/update-site-plan.dto';

@Injectable()
export class SitePlanService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSitePlanDto, tenant: string) {
    return this.prisma.sitePlan.create({
      data: { ...dto, siteId: tenant },
    });
  }

  findAll(tenant: string) {
    return this.prisma.sitePlan.findMany({
      where: { siteId: tenant },
      include: { payments: true },
    });
  }

  async findOne(id: string, tenant: string) {
    const sp = await this.prisma.sitePlan.findUnique({
      where: { id, siteId: tenant },
      include: { payments: true },
    });
    if (!sp) throw new NotFoundException('SitePlan not found');
    return sp;
  }

  async update(id: string, dto: UpdateSitePlanDto, tenant: string) {
    const result = await this.prisma.sitePlan.updateMany({
      where: { id, siteId: tenant },
      data: dto,
    });
    if (result.count === 0) throw new NotFoundException('SitePlan not found');
    return this.findOne(id, tenant);
  }

  async remove(id: string, tenant: string) {
    const result = await this.prisma.sitePlan.deleteMany({
      where: { id, siteId: tenant },
    });
    if (result.count === 0) throw new NotFoundException('SitePlan not found');
    return { success: true };
  }
}
