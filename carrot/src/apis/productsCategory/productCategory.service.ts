import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}
  // 카테고리 생성
  async create({ name }) {
    const result = await this.productCategoryRepository.save({ name });
    // console.log(result);
    return result;
  }
  // 카테고리 전체조회
  async findAll() {
    const result = await this.productCategoryRepository.find();
    // console.log(result);
    return result;
  }

  // 조회
  async find({ categoryId }) {
    const result = await this.productCategoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    // console.log(result);
    return result;
  }

  // 조회
  // 이름이 존재하는지 존재하지 않는지 확인
  async containsName({ categoryName }) {
    const result = await this.productCategoryRepository.findOne({
      name: categoryName,
    });
    // console.log(result);
    const result2 = result ? true : false;
    return result2;
  }

  // 수정
  async update({ categoryId, categoryName }) {
    const result = await this.productCategoryRepository.findOne({
      id: categoryId,
    });
    const newCategory = {
      ...result,
      name: categoryName,
    };
    return await this.productCategoryRepository.save(newCategory);
  }

  async delete({ categoryId }) {
    // 소프트 삭제 (typeORM 제공)
    // const result = await this.productCategoryRepository.softRemove({
    //   id: categoryId,
    // });

    const result = await this.productCategoryRepository.softDelete({
      id: categoryId,
    });

    return result.affected ? true : false;
  }
}
