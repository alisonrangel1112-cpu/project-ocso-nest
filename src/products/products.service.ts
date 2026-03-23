import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  async create(createProductDto: CreateProductDto) {
   const product = this.productRepository.create(createProductDto)
   const savedProduct = await this.productRepository.save(product);
   return savedProduct;

  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
 const product = this.productRepository.findOneBy({
  productId: id,
 })
 if (!product) throw new NotFoundException()
  return product;
 }

  async findByProvider(id: string){
  const productsFound = await this.productRepository.find({
    where: { product:  id  }
  });
  if (productsFound.length === 0) throw new NotFoundException()
    return productsFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
   const productToUpdate = await this.productRepository.preload({
    productId: id,
    ...updateProductDto
   })
  if (!productToUpdate) throw new NotFoundException()
  this.productRepository.save(productToUpdate)
  return productToUpdate;
  }
async remove(id: string) {
    const result = await this.productRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException('Product with id ${id} not found');
    }

    return {
      message: "Objeto con el id ${id} eliminado",
    };
  }
}
