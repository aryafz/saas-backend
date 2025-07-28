import { Module } from '@nestjs/common';
import { MedusaService } from './medusa.service';
import { SiteCommerceController } from './site-commerce.controller';
import { SiteModule } from '../site/site.module';

@Module({
  imports: [SiteModule],
  controllers: [SiteCommerceController],
  providers: [MedusaService],
  exports: [MedusaService],
})
export class CommerceModule {}
