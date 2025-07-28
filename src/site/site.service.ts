import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSiteDto, tenantId: string) {
    return this.prisma.site.create({ data: { ...dto, ownerId: tenantId } });
  }

  findAll(tenantId: string) {
    return this.prisma.site.findMany({ where: { ownerId: tenantId } });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.site.findFirst({ where: { id, ownerId: tenantId } });
  }

  async update(id: string, dto: UpdateSiteDto, ownerId: string) {
    const result = await this.prisma.site.updateMany({
      where: { id, ownerId },
      data: dto,
    });
    if (result.count === 0) throw new NotFoundException('Site not found');
    return this.findOne(id, ownerId);
  }

  async remove(id: string, ownerId: string) {
    const result = await this.prisma.site.deleteMany({
      where: { id, ownerId },
    });
    if (result.count === 0) throw new NotFoundException('Site not found');
    return { success: true };
  }
}
