import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(eMail: string): Promise<User> {
    return this.usersRepository.findOneBy({ eMail });
  }
}
