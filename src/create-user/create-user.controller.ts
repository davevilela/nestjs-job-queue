import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { CreateUserDTO } from './create-user-dto';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}
  @Post('/')
  async createUser(@Body() params: CreateUserDTO) {
    await this.sendMailService.sendMail(params);
    return params;
  }
}
