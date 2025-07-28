import { Module } from '@nestjs/common';
import { SiteThemeService } from './site-theme.service';
import { SiteThemeController } from './site-theme.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SiteThemeController],
  providers: [SiteThemeService],
  exports: [SiteThemeService],
})
export class SiteThemeModule {}
