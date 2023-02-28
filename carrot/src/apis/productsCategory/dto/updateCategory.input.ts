import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UpdateCategoryInput {
  @Field(() => String)
  name: string;
}
