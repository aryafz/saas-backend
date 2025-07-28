import { Module } from '@nestjs/common';
import { SitePlanService } from './site-plan.service';
import { SitePlanController } from './site-plan.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SitePlanController],
  providers: [SitePlanService],
  exports: [SitePlanService],
})
export class SitePlanModule {}
