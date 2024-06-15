import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ServiceService } from '../service/service.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private userService: UserService,
    private jwtService: JwtService,
    private serviceService: ServiceService,
  ) {}

  findAll(token: string): Promise<Order[]> {
    const userId = this.jwtService.decode(token).sub;
    return this.ordersRepository.findBy({
      userId: userId,
    });
  }

  findOne(orderId: number): Promise<Order> {
    return this.ordersRepository.findOneBy({ orderId });
  }

  async remove(orderId: number): Promise<void> {
    await this.ordersRepository.delete(orderId);
  }

  async create(token: string, order: Order): Promise<Order> {
    const userId = this.jwtService.decode(token).sub;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not Found');
    }
    const service = await this.serviceService.findOne(order.serviceId);
    let totalCost = order.amount * service.price;
    if (totalCost <= user.balance) {
      user.balance -= totalCost;
      order.userId = user.id;
      order.serviceId = service.id;
      await this.userService.update(user.id, user);
      return this.ordersRepository.save(order);
    }
    if (user.balance < totalCost) {
      throw new BadRequestException('Insufficient balance');
    }
  }

  async update(orderId: number, order: Order): Promise<Order> {
    await this.ordersRepository.update(orderId, order);
    return this.ordersRepository.findOneBy({ orderId });
  }
}
