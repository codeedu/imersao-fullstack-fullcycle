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
import { v4 as uuidv4 } from 'uuid';

export enum PixKeyKind {
  cpf = 'cpf',
  email = 'email',
}

@Entity({ name: 'pix_keys' })
export class PixKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kind: PixKeyKind;

  @Column()
  key: string;

  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccount;

  @Column()
  bank_account_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert() generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }
}