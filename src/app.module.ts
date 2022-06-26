import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config, { mailerConfig, redisConfig } from './config/config';

import { CreateUserController } from './create-user/create-user.controller';
import { SendMailConsumer } from './jobs/sendMail-consumer';
import { SendMailProducerService } from './jobs/sendMail-producer-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    BullModule.forRoot({
      redis: {
        port: Number(process.env.REDISPORT),
        host: process.env.REDISHOST,
        password: process.env.REDISPASSWORD,
        tls: { rejectUnauthorized: false },
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [SendMailProducerService, SendMailConsumer],
})
export class AppModule {}
