import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountController } from './bank-account.controller';

describe('BankAccountController', () => {
  let controller: BankAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountController],
    }).compile();

    controller = module.get<BankAccountController>(BankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
