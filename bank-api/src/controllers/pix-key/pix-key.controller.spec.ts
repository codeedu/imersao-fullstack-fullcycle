import { Test, TestingModule } from '@nestjs/testing';
import { PixKeyController } from './pix-key.controller';

describe('PixKeyController', () => {
  let controller: PixKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PixKeyController],
    }).compile();

    controller = module.get<PixKeyController>(PixKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
