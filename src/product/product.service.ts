import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductService {
  
  private products: Product[]=[]
  
  create(Product:Product):Product {
    this.products.push(Product);
    return Product;
  }

  findAll():Product[] {
    return this.products;
  }
  // deberia llamarse findById
  findOne(id: number) {
    return this.products.find(prod=> Number(prod.id) === id);
  }

  update(id: number, updatedProduct: Product): Product {
    const index= this.products.findIndex(product=> product.id === id);
    if (index !== -1){//puede ser cero o sea si existe el index
      /*se actualiza ese elemento del array utilizando la
       sintaxis de propagación (...) para mezclar los datos
       existentes del producto con los datos actualizados
      que se pasan en updatedProduct.*/
      this.products[index]={...this.products[index],...updatedProduct};  
      return this.products[index];
    }
    return null;
  }

  remove(id: number):Product {
    const index= this.products.findIndex(product=> product.id === id);
    if(index !== -1){
      const deletedProduct = this.products[index];
      this.products.splice(index,1);
      return deletedProduct;
    }
    return null;
  }
}
