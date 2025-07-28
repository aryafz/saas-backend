import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteThemeDto } from './dto/create-site-theme.dto';
import { UpdateSiteThemeDto } from './dto/update-site-theme.dto';

@Injectable()
export class SiteThemeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSiteThemeDto) {
    return this.prisma.siteTheme.create({ data: dto });
  }

  findAll(siteId: string) {
    return this.prisma.siteTheme.findMany({ where: { siteId } });
  }

  async findOne(id: string) {
    const st = await this.prisma.siteTheme.findUnique({ where: { id } });
    if (!st) throw new NotFoundException('SiteTheme not found');
    return st;
  }

  async update(id: string, dto: UpdateSiteThemeDto) {
    try {
      return await this.prisma.siteTheme.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('SiteTheme not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.siteTheme.delete({ where: { id } });
    } catch {
      throw new NotFoundException('SiteTheme not found');
    }
  }
}
