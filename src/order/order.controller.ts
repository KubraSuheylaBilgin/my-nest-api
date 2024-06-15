import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../entity/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Headers() headers): Promise<Order[]> {
    const [type, token] = headers.authorization?.split(' ');
    return this.orderService.findAll(token);
  }

  @Get(':id')
  findOne(@Param('id') orderId: number): Promise<Order> {
    return this.orderService.findOne(orderId);
  }

  @Post()
  create(@Headers() headers, @Body() order: Order): Promise<Order> {
    const [type, token] = headers.authorization?.split(' ');
    return this.orderService.create(token, order);
  }

  @Delete(':id')
  remove(@Param('id') orderId: number): Promise<void> {
    return this.orderService.remove(orderId);
  }

  @Put(':id')
  update(@Param('id') orderId: number, @Body() order: Order): Promise<Order> {
    return this.orderService.update(orderId, order);
  }
}
