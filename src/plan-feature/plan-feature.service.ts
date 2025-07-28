import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto';
import { UpdatePlanFeatureDto } from './dto/update-plan-feature.dto';

@Injectable()
export class PlanFeatureService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePlanFeatureDto) {
    return this.prisma.planFeature.create({ data: dto });
  }

  findAll(filter: { planId?: string; featureId?: string }) {
    return this.prisma.planFeature.findMany({ where: filter });
  }

  async findOne(id: string) {
    const pf = await this.prisma.planFeature.findUnique({ where: { id } });
    if (!pf) throw new NotFoundException('PlanFeature not found');
    return pf;
  }

  async update(id: string, dto: UpdatePlanFeatureDto) {
    try {
      return await this.prisma.planFeature.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('PlanFeature not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.planFeature.delete({ where: { id } });
    } catch {
      throw new NotFoundException('PlanFeature not found');
    }
  }
}
