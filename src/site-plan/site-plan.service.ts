import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSitePlanDto } from './dto/create-site-plan.dto';
import { UpdateSitePlanDto } from './dto/update-site-plan.dto';

@Injectable()
export class SitePlanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSitePlanDto, tenant: string) {
    return this.prisma.$transaction(async (tx) => {
      if (dto.isActive) {
        await tx.sitePlan.updateMany({
          where: { siteId: tenant },
          data: { isActive: false },
        });
      }
      return tx.sitePlan.create({
        data: { ...dto, siteId: tenant },
      });
    });
  }

  findAll(tenant: string) {
    return this.prisma.sitePlan.findMany({ where: { siteId: tenant } });
  }

  async findOne(id: string, tenant: string) {
    const sp = await this.prisma.sitePlan.findFirst({
      where: { id, siteId: tenant },
    });
    if (!sp) throw new NotFoundException('SitePlan not found');
    return sp;
  }

  async update(id: string, dto: UpdateSitePlanDto, tenant: string) {
    return this.prisma.$transaction(async (tx) => {
      if (dto.isActive) {
        await tx.sitePlan.updateMany({
          where: { siteId: tenant },
          data: { isActive: false },
        });
      }
      const result = await tx.sitePlan.updateMany({
        where: { id, siteId: tenant },
        data: dto,
      });
      if (result.count === 0) throw new NotFoundException('SitePlan not found');
      return this.findOne(id, tenant);
    });
  }

  async remove(id: string, tenant: string) {
    const result = await this.prisma.sitePlan.deleteMany({
      where: { id, siteId: tenant },
    });
    if (result.count === 0) throw new NotFoundException('SitePlan not found');
    return { success: true };
  }
}
