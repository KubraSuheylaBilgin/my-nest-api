import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { Service } from '../entity/service.entity';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @Post()
  create(@Body() service: Service): Promise<Service> {
    return this.serviceService.create(service);
  }
}
