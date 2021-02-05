import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyFirstController } from './controllers/my-first/my-first.controller';
import { BankAccount } from './models/bank-account.model';
import { BankAccountController } from './controllers/bank-account/bank-account.controller';
import { ConsoleModule } from 'nestjs-console';
import { FixturesCommand } from './fixtures/fixtures.command';
import { PixKeyController } from './controllers/pix-key/pix-key.controller';
import { PixKey } from './models/pix-key.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { Transaction } from './models/transaction.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConsoleModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [BankAccount, PixKey, Transaction]
    }),
    TypeOrmModule.forFeature([BankAccount, PixKey, Transaction]),
    ClientsModule.register([
      {
        name: 'CODEPIX_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_URL,
          package: 'github.com.codeedu.codepix',
          protoPath: [join(__dirname, 'protofiles/pixkey.proto')]
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'TRANSACTION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER]
          },
          consumer: {
            groupId: !process.env.KAFKA_CONSUMER_GROUP_ID ||
              process.env.KAFKA_CONSUMER_GROUP_ID === ''
                ? 'my-consumer-' + Math.random()
                : process.env.KAFKA_CONSUMER_GROUP_ID,
          }
        }
      }
    ])
  ],
  controllers: [AppController, MyFirstController, BankAccountController, PixKeyController, TransactionController],
  providers: [AppService, FixturesCommand],
})
export class AppModule {}
