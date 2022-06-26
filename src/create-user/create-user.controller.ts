import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { CreateUserDTO } from './create-user-dto';

@Controller('/')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}
  @Post('create-user')
  async createUser(@Body() params: CreateUserDTO) {
    await this.sendMailService.sendMail(params);
    return params;
  }

  @Get('test')
  async healhcheck() {
    return 'hello world';
  }
}
