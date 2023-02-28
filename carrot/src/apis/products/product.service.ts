import { Injectable } from '@nestjs/common';
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
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });

    console.log(result);
  }
  // READ ALL
  async findAll() {
    return await this.productRepository.find({
      relations: [
        'productSaleslocation',
        'productCategory',
        'productTags',
        'user',
      ],
    });
  }

  // create
  async create({ createProductInput }) {
    const {
      productSaleslocation,
      productCategoryId,
      productTags,
      seller,
      ...product
    } = createProductInput;

    const user = await this.userRepository.findOne({ where: { id: seller } });
    if (!user) return null;
    console.log(user);
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
    //
    const result3 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, //result 통쨰로 넣기 vs id만 넣기
      productCategory: { id: productCategoryId },
      productTags: result2,
      seller: seller,
    });
    return result3;
  }
}
