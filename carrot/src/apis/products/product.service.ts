import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // READ
  async findOne({ productId }) {
    const result = await this.productRepository.findOne({
      where: { id: productId },
      // relations : 엔티티의 이름 그대로 작성, table name이 아님
      relations: [
        'seller',
        'productSaleslocation',
        'productCategory',
        'productTags',
      ],
    });

    return result;
  }

  // READ ALL
  async findAll() {
    return await this.productRepository.find({
      relations: [
        'productSaleslocation',
        'productCategory',
        'productTags',
        'seller',
      ],
    });
  }

  // 상품 등록
  async create({ createProductInput }) {
    const {
      productSaleslocation,
      productCategoryId,
      productTags,
      seller,
      ...product
    } = createProductInput;

    // 유저 확인
    const user = await this.userRepository.findOne({ where: { id: seller } });
    if (!user) return null;

    // 상품 주소 테이블
    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    // productTags // ["#전자제품","#영등포","#컴퓨터"]
    const result2 = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');
      // 이미 등록된 태그인지 확인해보기
      const prevTag = await this.productTagRepository.findOne({
        where: { name: tagname },
      });
      // 기존에 태그가 존재한다면
      if (prevTag) {
        result2.push(prevTag);
        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        result2.push(newTag);
      }
    }

    // 테이블에 저장
    const result3 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, //result 통쨰로 넣기 vs id만 넣기
      productCategory: { id: productCategoryId },
      productTags: result2,
      seller: user.id,
    });
    return result3;
  }

  // update
  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    // .save 객체 그상태로 반환 받아올수 있음
    // .update는 수정된 정보를 받아옴
    const result = await this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  // update-checkvalidation-soldout
  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  // delete
  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId }); // 다른 조건으로도 삭제 가능
    return result.affected ? true : false;
  }
}
