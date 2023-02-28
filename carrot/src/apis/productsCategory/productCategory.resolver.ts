import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  // 전체 조회
  @Query(() => [ProductCategory])
  fetchProductCategorys() {
    return this.productCategoryService.findAll();
  }
  // READ
  @Query(() => ProductCategory)
  fetchProductCategoryId(@Args('categoryId') categoryId: string) {
    return this.productCategoryService.find({ categoryId });
  }

  // 조회 - 이름이 있으면 true, 없으면 false를 반환
  @Query(() => Boolean)
  containsProductCategoryName(
    @Args('categoryName') categoryName: string, //
  ) {
    return this.productCategoryService.containsName({ categoryName });
  }
  // CREATE
  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }
  // UPDATE
  @Mutation(() => ProductCategory)
  updateProductCategory(
    @Args('categoryId') categoryId: string,
    @Args('categoryName') categoryName: string,
  ) {
    return this.productCategoryService.update({
      categoryId,
      categoryName,
    });
  }

  // DELETE
  @Mutation(() => Boolean)
  deleteProductCategory(
    @Args('categoryId') categoryId: string, //
  ) {
    return this.productCategoryService.delete({ categoryId });
  }
}
