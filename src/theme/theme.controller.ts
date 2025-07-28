import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('themes')
@Controller('themes')
export class ThemeController {
  constructor(private readonly service: ThemeService) {}

  @Post()
  @ApiOperation({ summary: 'Create theme' })
  create(@Body() dto: CreateThemeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List themes' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get theme' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update theme' })
  update(@Param('id') id: string, @Body() dto: UpdateThemeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete theme' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
