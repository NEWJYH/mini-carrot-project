// import { InputType, PartialType, OmitType, PickType } from '@nestjs/graphql';
import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

// createProductInput을 가져와서 하는 방법
// extends 상속
// PartialType을 사용하게 되면 전부 nullable됨
// PickType - 어떤것 선택할 것인지?
// PickYpe(CreateProductInput, {'name', 'price'}) 만 상속
// OmitType - 제외할것
// OmitType(CreateProductInput, {"description"}) 제외하고 나머지 상속
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

// 기본
// @InputType()
// export class UpdateProductInput {
//   @Field(() => String, { nullable: true })// 수정하고 싶은것만 수정하기 위해서
//   name: string;

//   @Field(() => String, { nullable: true })
//   description: string;

//   @Min(0)
//   @Field(() => Int, { nullable: true })
//   price: number;
// }

// class-validator
//
