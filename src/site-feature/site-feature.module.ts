import { Module } from '@nestjs/common';
import { SiteFeatureService } from './site-feature.service';
import { SiteFeatureController } from './site-feature.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SiteFeatureController],
  providers: [SiteFeatureService],
  exports: [SiteFeatureService],
})
export class SiteFeatureModule {}
