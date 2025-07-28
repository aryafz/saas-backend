import { Injectable } from '@nestjs/common';
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

  update(id: string, dto: UpdateSiteDto, tenantId: string) {
    return this.prisma.site.update({
      where: { id, ownerId: tenantId },
      data: dto,
    });
  }

  remove(id: string, tenantId: string) {
    return this.prisma.site.delete({ where: { id, ownerId: tenantId } });
  }
}
