import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocation/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  // 상품 제목
  @Field(() => String)
  title: string;

  // 상품 설명
  @Field(() => String)
  description: string;

  // 상품 가격
  @Min(0)
  @Field(() => Int)
  price: number;

  // 가격 제안 여부
  @Field(() => Boolean)
  proposition: boolean;

  // 작성자 아이디
  @Field(() => String)
  seller: string;

  // 나눔 여부
  @Field(() => Boolean)
  sharing: boolean;

  // 카테고리 id
  @Field(() => String)
  productCategoryId: string;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => [String])
  productTags: string[];
}
