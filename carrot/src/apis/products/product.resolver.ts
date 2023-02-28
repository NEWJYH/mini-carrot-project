import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // 하나만 ID로 조회
  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }
  // 전체조회
  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  // 물품등록
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create({ createProductInput });
  }

  // update
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });
    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  // delete
  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('producId') productId: string, //
  ) {
    return await this.productService.delete({ productId });
  }
}
