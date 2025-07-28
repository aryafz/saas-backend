import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteFeatureDto } from './dto/create-site-feature.dto';
import { UpdateSiteFeatureDto } from './dto/update-site-feature.dto';

@Injectable()
export class SiteFeatureService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSiteFeatureDto, tenant: string) {
    return this.prisma.siteFeature.create({ data: { ...dto, siteId: tenant } });
  }

  findAll(tenant: string) {
    return this.prisma.siteFeature.findMany({ where: { siteId: tenant } });
  }

  async findOne(id: string, tenant: string) {
    const sf = await this.prisma.siteFeature.findFirst({
      where: { id, siteId: tenant },
    });
    if (!sf) throw new NotFoundException('SiteFeature not found');
    return sf;
  }

  async update(id: string, dto: UpdateSiteFeatureDto, tenant: string) {
    try {
      return await this.prisma.siteFeature.update({
        where: { id, siteId: tenant },
        data: dto,
      });
    } catch {
      throw new NotFoundException('SiteFeature not found');
    }
  }

  async remove(id: string, tenant: string) {
    try {
      return await this.prisma.siteFeature.delete({
        where: { id, siteId: tenant },
      });
    } catch {
      throw new NotFoundException('SiteFeature not found');
    }
  }
}
