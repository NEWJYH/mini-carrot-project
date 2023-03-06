import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('mobileNumber') mobileNumber: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({ email, hashedPassword, mobileNumber });
  }

  // @UseGuards(GqlAuthAccessGuard)
  // @Query(() => String)
  // fetchUser() {
  //   console.log('fetchUser 실행 완료!!!');
  //   return 'fetchUser 실행 완료!!!';
  // }
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: any, //
  ) {
    console.log('fetchUser 실행 완료!!!');
    console.log('유저정보는??!!!', currentUser);
    return 'fetchUser 실행 완료!!!';
  }
}
