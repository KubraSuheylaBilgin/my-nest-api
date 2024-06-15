import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entity/service.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  findOne(id: number): Promise<Service> {
    return this.serviceRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }

  create(service: Service): Promise<Service> {
    return this.serviceRepository.save(service);
  }

  async update(id: number, service: Service): Promise<Service> {
    await this.serviceRepository.update(id, service);
    return this.serviceRepository.findOneBy({ id });
  }
}
