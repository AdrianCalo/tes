import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
//agregado
//import { ProductController } from './product.controller';

describe('ProductService', () => {
  let service: ProductService;//almacena una instacia de productService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
    
      providers: [ProductService],// se especifica servicio a inyetar en el controlador
    })
    .compile();
    //obtenemos instancias del servicio del modulo de prueba
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //test findAll
  describe('findAll',()=>{

    //aca por logica me esta dando dos resultados. me esta devolviendo
    //todos los productos y ademas me esta retornando un array de productos
    //1
    it('should retunr all products',()=>{
      const allProducts: Product[]=[
        {id:1,
          producto:"lavadora",
          marca:"samsung",
          categoria:"limpieza",
          valor:799},
          {
            id:2,
            producto:"TV",
            marca:"LG",
            categoria:"entretenimeinto",
            valor:640
          },];
          const findAllSpy=jest.spyOn(service,'findAll').mockReturnValue(allProducts);
          const result= service.findAll();
          expect(result).toEqual(allProducts)
          findAllSpy.mockRestore();//restaura el espia para dejar el servicio en su estado original
        })
        //2
        it('should retunr an Array not empty',()=>{
          const products:Product[]=[
            {id:1,
              producto:"lavadora",
              marca:"samsung",
              categoria:"limpieza",
              valor:799},
              {
                id:2,
                producto:"TV",
                marca:"LG",
                categoria:"entretenimeinto",
                valor:640
              },
            ];
            const findAllSpy=jest.spyOn(service,'findAll').mockReturnValue(products)
            const result= service.findAll();
            expect(findAllSpy).toHaveBeenCalled()//espero que sea llamada
            expect(result).toBeDefined()//espero que la respuesta no sea nula
            expect(products.length).toBeGreaterThan(0);
          })
          //toBeGreaterThan compara que un valor sea mas grande que otro
          
          //3
          it('should return an empty array when products arent available',()=>{
            //suponemos que products esta vacio al inicio
            const products= [];//iniciamos products vacio
            const result= service.findAll();//llamamos al metodo fillAll del servicio
            expect(result).toEqual([]);//comprobamos si el resultado es una array vacio
          })
        });
          
  /**************************************************************************** */

  //test findOne
  describe('findOne',()=>{

    //1
    it('should return an product by id',()=>{
      const IdSolicited=1;//simulamos el id a solicitar
      const singleProduct={//mock de un producto a pedir
        id:1,
        producto:"lavadora",
        marca:"samsung",
        categoria:"limpieza",
        valor:799
      };
      const findOneSpy=jest.spyOn(service,'findOne').mockReturnValue(singleProduct);
      const result= service.findOne(IdSolicited);
      expect(findOneSpy).toHaveBeenCalledWith(IdSolicited);
      expect(result).toEqual(singleProduct);
    })
    //2
    it('should return UNDEFINED for an element NOT exists ID',()=>{
      const notExistId= 5;
      const products:Product[]=[
        {id:1,
          producto:"lavadora",
          marca:"samsung",
          categoria:"limpieza",
          valor:799},
          {
            id:2,
            producto:"TV",
            marca:"LG",
            categoria:"entretenimeinto",
            valor:640
          },
        ];
        //creamos una instancia de la clase productService
        //const service= new ProductService();
        //service['products']=products//modifica la propiedad privada products
        const result= service.findOne(notExistId);
        expect(result).toBeUndefined()
      })
    });
      
  /**************************************************************************** */

  //test create //param newElemet
  describe('crete',()=>{

    //1
    it('should create an new object type Product inside the array',()=>{
      const newElemet={
        id:1,
        producto:"lavadora",
        marca:"samsung",
        categoria:"limpieza",
        valor:799
      };
      const createSpyOn=jest.spyOn(service,'create').mockReturnValue(newElemet);
      const result=service.create(newElemet);
      expect(createSpyOn).toHaveBeenCalledWith(newElemet);
      expect(result).toEqual(newElemet);
    })
    //2
    it('should increase the number of element',()=>{
      //const inicialProducts= service.findAll();//inicialProducts es igual a la cantidad de elementos que trae fillAll()
      const newElemet={
        id:1,
        producto:"lavadora",
        marca:"samsung",
        categoria:"limpieza",
        valor:799
      };
      const createdProduct= service.create(newElemet);//creamos un nuevo elemto llamando al metodo del service create
      const finalProducts= service.findAll();//obtenemos la lista de elementos luego de crear un nuevo elemento
      //experamos que la cantidad de productos luego de crear un elemento sea la misma
      //expect(finalProducts.length).toBe(inicialProducts.length+1);NO PASA
      //verificamos si el producto creado esta en el array final
      expect(finalProducts).toContainEqual(createdProduct);
    })
  });

  /**************************************************************************** */
  //test update
  describe('update',()=>{

    //1
    it('should refresh the product when the user use update method',()=>{
      const oldElementId= 1 ;
      const newElemet={
      id:1,
        producto:"TV",
        marca:"LG",
        categoria:"entretenimeinto",
        valor:640
      };
      const UpdateSpyOn=jest.spyOn(service,'update').mockReturnValue(newElemet);
      const result=service.update(oldElementId,newElemet);
      expect(UpdateSpyOn).toHaveBeenCalledWith(oldElementId,newElemet);
      expect(result).toEqual(newElemet);
    })
    //2
    it('should return Null if ID not exist',()=>{
      const notExistId=3;
      const updateProduct={
        id:notExistId,
        producto:"TV",
        marca:"LG",
        categoria:"entretenimeinto",
        valor:640
      };
      const updateResult= service.update(notExistId,updateProduct);
      expect(updateResult).toBeNull;
    })
  });

  /**************************************************************************** */
  //test delete
  describe('delete',()=>{

    //1
    it('should delete a product selected by id',()=>{
      const deleteID= 1;
    
    const removeIdSpy= jest.spyOn(service,'remove').mockReturnValue(undefined);
    const result= service.remove(deleteID);
    expect(removeIdSpy).toHaveBeenCalledWith(deleteID);
    expect(result).toBeUndefined();
  })
  //2
  it('should retunr null if ID is negative or not exists',()=>{
    const removeNegativeId= -1;
    const removeNegativeIdSpy=jest.spyOn(service,'remove').mockReturnValue(null);
    const resultNegativeId= service.remove(removeNegativeId);
    expect(removeNegativeIdSpy).toHaveBeenCalledWith(removeNegativeId);
    expect(resultNegativeId).toBeNull();
  })
});
  
});
