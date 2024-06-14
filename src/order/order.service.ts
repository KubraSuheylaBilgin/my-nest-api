import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        private userService: UserService
    ){}
    
    findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    findOne(orderId:number): Promise<Order> {
        return this.ordersRepository.findOneBy({orderId});
    } 

    async remove(orderId:number): Promise<void>{
        await this.ordersRepository.delete(orderId);
    }

    //TODO userService'den siparişi veren kişinin balance bilgisi alınacak,
    //Eğer order'ın amount * price verisi <= balance ise
    //sipariş oluşturulacak, sonrasında da balance sipariş ücreti kadar düşecek
    //eğer yeterli değilse, sipariş oluşturulamadı diye hata döndürelecek
    async create(id :number, order:Order): Promise<Order> {
        const user = await this.userService.findOne(id)
        if(!user){
            throw new BadRequestException("User not Found");
        }
        if(order.amount*order.price <= user.balance ){
            user.balance -= order.amount*order.price
            await this.userService.create(user);
            return this.ordersRepository.save(order);
        }
        if (user.balance < order.price) {
            throw new BadRequestException('Insufficient balance');
          }
    }
    
    async update(orderId: number, order: Order): Promise<Order> {
        await this.ordersRepository.update(orderId, order);
        return this.ordersRepository.findOneBy({ orderId });
      }


}
