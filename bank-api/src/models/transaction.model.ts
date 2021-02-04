import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccount } from './bank-account.model';
import { PixKeyKind } from './pix-key.model';
import { v4 as uuidv4 } from 'uuid';

export enum TransactionStatus{
  pending = 'pending',
  completed = 'completed',
  error = 'error'
};

export enum TransactionOperation {
  debit = 'debit',
  credit = 'credit'
}

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  external_id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => BankAccount)
  @JoinColumn({name: "bank_account_id"})
  bankAccount: BankAccount;

  @Column()
  bank_account_id: string;

  @ManyToOne(() => BankAccount)
  @JoinColumn({name: "bank_account_from_id"})
  bankAccountFrom: BankAccount;

  @Column()
  bank_account_from_id: string;

  @Column()
  pix_key_key: string;

  @Column()
  pix_key_kind: PixKeyKind;

  @Column()
  status: TransactionStatus = TransactionStatus.pending;

  @Column()
  operation: TransactionOperation

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert() generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }

  @BeforeInsert() generateExternalId() {
    if (this.external_id) {
      return;
    }
    this.external_id = uuidv4();
  }
}
