import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  private products: CreateProductDto[] = [...
 ]
  create(createProductDto: CreateProductDto) {
   const product = this.productRepository.create(createProductDto)
   const savedProduct = this.productRepository.save(product);
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

  findByProvider(id: string){
  const productsFound = this.products.filter((product) => product.provider === id)
  if (productsFound.length === 0) throw new NotFoundException()
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
   const productToUpdate = await this.productRepository.preload({
    productId: id,
    ...updateProductDto
   })
  if (!productToUpdate) throw new NotFoundException()
  this.productRepository.save(productToUpdate)
  return productToUpdate;
  }

  async remove(id: string) {
  return this.productRepository.Delete({
    productId: id,
  })
  return {
    message: 'objeto con el id ${id} eliminado'
  }
  }
}
