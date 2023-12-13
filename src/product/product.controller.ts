import { Controller, Get, Post, Body, Put, Param, Delete, } from '@nestjs/common';
import { ProductService } from './product.service';
//import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';



@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product:Product): Product {
    return this.productService.create(product);
  }

  @Get()
  findAll():Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number):Product {
    return this.productService.findOne(Number(id));
  }

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateProduct: Product):Product {
  //  return this.productService.update(Number(id), updateProduct);
  //}

  //hacer Put
  @Put(':id')
  updateProduct(@Param('id') id:number, @Body() updateProduct:Product):Product{
    return this.productService.update(Number(id),updateProduct)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(Number(id));
  }
}
