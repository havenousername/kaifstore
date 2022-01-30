import { Test, TestingModule } from '@nestjs/testing';
import { ProductGroupsController } from './product-groups.controller';

describe('ProductGroupsController', () => {
  let controller: ProductGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductGroupsController],
    }).compile();

    controller = module.get<ProductGroupsController>(ProductGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
