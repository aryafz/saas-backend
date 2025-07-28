import { Module } from '@nestjs/common';
import { MedusaService } from './medusa.service';

@Module({
  providers: [MedusaService],
  exports: [MedusaService],
})
export class CommerceModule {}
