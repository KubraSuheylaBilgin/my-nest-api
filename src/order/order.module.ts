import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule],
  providers: [OrderService],
  controllers: [OrderController]
  
})
export class OrderModule {}
