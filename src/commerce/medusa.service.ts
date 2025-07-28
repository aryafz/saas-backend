import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class MedusaService {
  /** Fetch a list of products from Medusa Admin API */
  async listProducts(): Promise<any> {
    // TODO: implement
    return Promise.resolve([]);
  }

  /** Forward an order to Medusa Store API */
  async createOrder(orderDto: CreateOrderDto): Promise<any> {
    // TODO: implement
    return Promise.resolve(orderDto);
  }
}
