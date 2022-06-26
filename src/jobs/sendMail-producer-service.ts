import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}
  async sendMail(params: CreateUserDTO) {
    await this.queue.add('sendMail-job', params);
  }
}
export { SendMailProducerService };
