import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteThemeDto } from './dto/create-site-theme.dto';
import { UpdateSiteThemeDto } from './dto/update-site-theme.dto';

@Injectable()
export class SiteThemeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSiteThemeDto, tenant: string) {
    return this.prisma.$transaction(async (tx) => {
      if (dto.isActive) {
        await tx.siteTheme.updateMany({
          where: { siteId: tenant, isActive: true },
          data: { isActive: false },
        });
      }
      return tx.siteTheme.create({ data: { ...dto, siteId: tenant } });
    });
  }

  findAll(tenant: string) {
    return this.prisma.siteTheme.findMany({ where: { siteId: tenant } });
  }

  async findOne(id: string, tenant: string) {
    const st = await this.prisma.siteTheme.findFirst({
      where: { id, siteId: tenant },
    });
    if (!st) throw new NotFoundException('SiteTheme not found');
    return st;
  }

  async update(id: string, dto: UpdateSiteThemeDto, tenant: string) {
    return this.prisma.$transaction(async (tx) => {
      if (dto.isActive) {
        await tx.siteTheme.updateMany({
          where: { siteId: tenant, isActive: true },
          data: { isActive: false },
        });
      }
      const result = await tx.siteTheme.updateMany({
        where: { id, siteId: tenant },
        data: dto,
      });
      if (result.count === 0)
        throw new NotFoundException('SiteTheme not found');
      return this.findOne(id, tenant);
    });
  }

  async remove(id: string, tenant: string) {
    const result = await this.prisma.siteTheme.deleteMany({
      where: { id, siteId: tenant },
    });
    if (result.count === 0) throw new NotFoundException('SiteTheme not found');
    return { success: true };
  }
}
