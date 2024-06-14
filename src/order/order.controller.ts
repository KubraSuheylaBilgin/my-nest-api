import { Controller, Get, Post, Param, Delete, Body, Put,BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../entity/order.entity';
@Controller('order')
export class OrderController {
constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') orderId: number): Promise<Order> {
    return this.orderService.findOne(orderId);
  }

  @Post(':id')
  create(@Param('id') id:number,@Body() order: Order): Promise<Order> {
    return this.orderService.create(id,order);
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
