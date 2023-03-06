import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { ProductModule } from './apis/products/product.module';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { UserModule } from './apis/users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),

    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터 베이스 타입
      host: 'localhost', // local 환경으로 진행 // docker환경 my-database
      port: 3306, // mysql은 기본 port는 3306
      username: 'root', // mysql은 기본 user는 root로 지정
      password: '12345678', // 본인의 mysql password // docker환경 root
      database: 'carrot', // 연결할 데이터 베이스명
      entities: [__dirname + '/apis/**/*.entity.*'], // 데이터 베이스와 연결할 entity
      synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true, // 콘솔 창에 log를 표시할 것인지
    }),
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
