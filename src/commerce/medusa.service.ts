import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class MedusaService {
  /**
   * TODO: fetch product list from Medusa
   */
  async listProducts(): Promise<any> {
    return Promise.resolve([]);
  }

  /**
   * TODO: forward order data to Medusa
   */
  async createOrder(orderDto: CreateOrderDto): Promise<any> {
    return Promise.resolve(orderDto);
  }
}
