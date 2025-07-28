import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSiteDto, tenantId: string) {
    const site = await this.prisma.site.create({
      data: { ...dto, ownerId: tenantId },
    });

    if (process.env.MEDUSA_URL) {
      try {
        const { createStoresWorkflow } = await import('@medusajs/core-flows');
        const { result } = await createStoresWorkflow({} as any).run({
          input: { stores: [{ name: site.name, metadata: { siteId: site.id } }] },
        });
        const store = result[0];
        await this.prisma.site.update({
          where: { id: site.id },
          data: {
            medusaStoreId: store.id,
            defaultSalesChannelId: store.default_sales_channel_id,
          },
        });
      } catch {
        // ignore workflow errors for now
      }
    }

    return site;
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
