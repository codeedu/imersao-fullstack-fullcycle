import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity({
    name: 'bank_accounts'
})
export class BankAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    account_number: string;

    @Column()
    owner_name: string;

    @Column()
    balance: number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @BeforeInsert()
    generateId(){
        if(this.id){
            return;
        }

        this.id = uuidv4();
    }

    @BeforeInsert()
    initBalance(){
        if(this.balance){
            return;
        }

        this.balance = 0;
    }
}
