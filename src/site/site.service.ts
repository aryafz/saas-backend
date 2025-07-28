import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSiteDto) {
    return this.prisma.site.create({ data: dto });
  }

  findAll() {
    return this.prisma.site.findMany();
  }

  findOne(id: string) {
    return this.prisma.site.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateSiteDto) {
    return this.prisma.site.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.site.delete({ where: { id } });
  }
}
