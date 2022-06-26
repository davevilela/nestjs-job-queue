import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const {
      data: { email, name },
    } = job;

    const from = this.configService.get('EMAIL_FROM');

    await this.mailService.sendMail({
      to: email,
      from: from,
      subject: 'Seja bem vindo!',
      text: `Olá ${name}!, seu cadastro foi realizado com sucesso!`,
    });
  }

  @OnQueueError()
  onQueueError(job: Job) {
    console.log('queue error', job);
  }
  @OnQueueCompleted()
  OnQueueCompleted(job: Job) {
    console.log('queue success', job);
  }
}

export { SendMailConsumer };
