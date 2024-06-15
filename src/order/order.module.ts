import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from 'src/user/user.module';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, ServiceModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
