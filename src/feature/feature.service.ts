import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFeatureDto) {
    return this.prisma.feature.create({ data: dto });
  }

  findAll() {
    return this.prisma.feature.findMany();
  }

  findOne(id: string) {
    return this.prisma.feature.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateFeatureDto) {
    return this.prisma.feature.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.feature.delete({ where: { id } });
  }
}
