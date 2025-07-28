import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateThemeDto) {
    return this.prisma.theme.create({ data: dto });
  }

  findAll() {
    return this.prisma.theme.findMany();
  }

  async findOne(id: string) {
    const theme = await this.prisma.theme.findUnique({ where: { id } });
    if (!theme) throw new NotFoundException('Theme not found');
    return theme;
  }

  async update(id: string, dto: UpdateThemeDto) {
    try {
      return await this.prisma.theme.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException('Theme not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.theme.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Theme not found');
    }
  }
}
