import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/models/bank-account.model';
import { Transaction } from 'src/models/transaction.model';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, Repository } from 'typeorm';

@EventSubscriber()
export class TransactionSubscriber implements EntitySubscriberInterface<Transaction>{

    constructor(
        connection: Connection,
        @InjectRepository(BankAccount)
        private bankAccountRepo: Repository<BankAccount>
    ){
        connection.subscribers.push(this);
    }

    listenTo(){
        return Transaction;
    }

    async afterInsert(event: InsertEvent<Transaction>){
        const transaction = event.entity;
        const bankAccount = await this.bankAccountRepo.findOneOrFail(
            transaction.bank_account_id
        );
        bankAccount.balance = bankAccount.balance + transaction.amount;
        await this.bankAccountRepo.save(bankAccount);

    }
}
