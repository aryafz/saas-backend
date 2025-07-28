import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteFeatureDto } from './dto/create-site-feature.dto';
import { UpdateSiteFeatureDto } from './dto/update-site-feature.dto';

@Injectable()
export class SiteFeatureService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSiteFeatureDto) {
    return this.prisma.siteFeature.create({ data: dto });
  }

  findAll(siteId: string) {
    return this.prisma.siteFeature.findMany({ where: { siteId } });
  }

  async findOne(id: string) {
    const sf = await this.prisma.siteFeature.findUnique({ where: { id } });
    if (!sf) throw new NotFoundException('SiteFeature not found');
    return sf;
  }

  async update(id: string, dto: UpdateSiteFeatureDto) {
    try {
      return await this.prisma.siteFeature.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('SiteFeature not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.siteFeature.delete({ where: { id } });
    } catch {
      throw new NotFoundException('SiteFeature not found');
    }
  }
}
