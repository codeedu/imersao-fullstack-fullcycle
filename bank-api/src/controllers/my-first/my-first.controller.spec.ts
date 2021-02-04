import { Test, TestingModule } from '@nestjs/testing';
import { MyFirstController } from './my-first.controller';

describe('MyFirstController', () => {
  let controller: MyFirstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyFirstController],
    }).compile();

    controller = module.get<MyFirstController>(MyFirstController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
