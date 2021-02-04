import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransactionsTable1612394636514 implements MigrationInterface {
  
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'transactions',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'external_id',
                type: 'uuid',
              },
              {
                name: 'amount',
                type: 'double precision',
              },
              {
                name: 'description',
                type: 'varchar',
                isNullable: true
              },
              {
                name: 'bank_account_id',
                type: 'uuid',
              },
              {
                name: 'bank_account_from_id',
                type: 'uuid',
                isNullable: true
              },
              {
                name: 'pix_key_key',
                type: 'varchar',
                isNullable: true
              },
              {
                name: 'pix_key_kind',
                type: 'varchar',
                isNullable: true
              },
              {
                name: 'status',
                type: 'varchar',
              },
              {
                name: 'operation',
                type: 'varchar',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
              },
            ],
          }),
        );
    
        await queryRunner.createForeignKey(
          'transactions',
          new TableForeignKey({
            name: 'transactions_bank_account_id_foreign_key',
            columnNames: ['bank_account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bank_accounts',
          }),
        );
    
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
          'transactions',
          'transactions_bank_account_id_foreign_key',
        );
        await queryRunner.dropTable('transactions');
      }

}
