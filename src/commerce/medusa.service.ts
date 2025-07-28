import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Medusa from '@medusajs/medusa-js';
import { CreateOrderDto } from './create-order.dto';

interface MedusaConfig {
  url: string;
  apiKey?: string;
}

@Injectable()
export class MedusaService {
  constructor(private config: ConfigService) {}

  private getClient(cfg?: Partial<MedusaConfig>) {
    return new Medusa({
      baseUrl: cfg?.url || (this.config.get<string>('MEDUSA_URL') as string),
      maxRetries: 0,
      apiKey: cfg?.apiKey || this.config.get<string>('MEDUSA_API_KEY'),
    });
  }

  /** Fetch products from Medusa Admin API */
  listProducts(salesChannelId: string) {
    return this.getClient().admin.products.list({
      sales_channel_id: [salesChannelId],
    });
  }

  createProduct(body: any) {
    return this.getClient().admin.products.create(body);
  }

  updateProduct(id: string, body: any) {
    return this.getClient().admin.products.update(id, body);
  }

  deleteProduct(id: string) {
    return this.getClient().admin.products.delete(id);
  }

  listOrders(salesChannelId: string) {
    return this.getClient().admin.orders.list({
      sales_channel_id: [salesChannelId],
    });
  }

  retrieveOrder(id: string) {
    return this.getClient().admin.orders.retrieve(id);
  }

  createOrder(orderDto: CreateOrderDto) {
    return this.getClient().admin.orders.create(orderDto);
  }
}
