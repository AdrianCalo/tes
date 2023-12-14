import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;// almacena una instancia del controlador
  let service: ProductService;//almacena una instacia de productService
  let productMoked:[{id:1,
    producto:"lavadora",
    marca:"samsung",
    categoria:"limpieza",
    valor:799},]
    let serviceMock={
      products:()=>productMoked,// funcion que retorna contenido de productMoked
    }//objeto que simula el servicio ProductService
  
  beforeEach(async () => {// antes de cada test, configura el entorno
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],// se especifica el controlador a probar
      providers: [ProductService],// se especifica servicio a inyetar en el controlador
    })//sustituimos el provedor real con una version simulada(mock)
    .overrideProvider(serviceMock)
    .useValue(productMoked)//utilizamos los datos simulados 
    .compile();//compilamos el modulo de prueba

    //obtenemos instancias del controlador y el servicio del modulo de prueba
    controller = module.get<ProductController>(ProductController);
    service= module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  //test method
  
  //test findAll debe devolver un array de productos
  describe('findAll',()=>{

    it('should return allProduct', ()=>{
      const allProduct: Product[]=[//simulamos los datos de producto
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
        //simula el metodo findAll del servicio ProductService
        const productTest = jest.spyOn(service,'findAll').mockReturnValue(allProduct);
        const result= controller.findAll();//ejecuta el metodo findAll del controlador
        expect(result).toEqual(allProduct);//compruea q el resultado sea igual a todos los productos
        productTest.mockRestore()// restaura el metodo  findAll del servicio productService
      });
    });
/************************************************************************************************** */
    //test findID
    describe('findOne',()=>{

      it('should return an element by ID', ()=> {
        const ProductID= 1;// id del producto que se espera encontrar
        const singleProduct= { //mock del producto
          id: 1,
          producto: "lavadora",
          marca: "samsung",
          categoria: "limpieza",
          valor: 799
        };
        //simulamos el metodo findOne del servicio productService
        const findOneSpy= jest.spyOn(service, 'findOne').mockReturnValue(singleProduct);
        //ejecutamos el metodo findOne del controlador
        const result = controller.findOne(ProductID);
        
        //verificamos que el metodo findOne del servicio se llamo con el ID del producto
        expect(findOneSpy).toHaveBeenCalledWith(ProductID);
        expect(result).toEqual(singleProduct);
      });
      it('should retunr Null if ID not exist',()=>{
        const IdNotExist = 10;
        const nullproduct = null;
        
        const findOneSpy= jest.spyOn(service,'findOne').mockReturnValue(nullproduct);
        const result=controller.findOne(IdNotExist);
        expect(findOneSpy).toHaveBeenCalledWith(IdNotExist);
        expect(result).toBeNull();
      })
    });
  /************************************************************************************************** */
  //test PUT
  describe('update',()=>{

    it('should refresh objets when i use Update method', ()=>{
      const oldProductID=1;//id del producto a actualizar
      const newProduct={
        id: 1,
        producto: "Tv",
        marca: "LG",
        categoria: "entretenimiento",
        valor: 990
      }
      const UpdateSpyOn= jest.spyOn(service,'update').mockReturnValue(newProduct);//simulamos el metodo update del productService
      const result= controller.updateProduct(oldProductID,newProduct);//ejecutamos el metodo update del controlador.
      expect(UpdateSpyOn).toHaveBeenCalledWith(oldProductID,newProduct)//verificamos que el metodo update del sercicio se llamo con el id del producto y los datos actualziados
      expect(result).toEqual(newProduct);
    })
  });
    
/************************************************************************************************** */
  //test create
  describe('create',()=>{

    it('should create a new object inside the array', ()=>{
      const newProduct={
        id:3,
        producto: "Tv",
        marca: "LG",
        categoria: "entretenimiento",
        valor: 990
      }
      const createSpyOn= jest.spyOn(service,'create').mockReturnValue(newProduct);
      const result = controller.create(newProduct);
      expect(createSpyOn).toHaveBeenCalledWith(newProduct);
      expect(result).toEqual(newProduct)
    })
  });
  /************************************************************************************************** */

  //test delete
  describe('delete',()=>{

    it('should delete an object from array',()=>{
      //const deleteProductID=1;
      const product= {
      id: 1,
      producto: "Tv",
      marca: "LG",
      categoria: "entretenimiento",
      valor: 990
    };
    const deleteSpyOn= jest.spyOn(service,'remove').mockReturnValue(undefined);
    //al eliminar el producto me tiene que devolver void o undefined
    const result= controller.remove(product.id);
    expect(deleteSpyOn).toHaveBeenCalledWith(product.id);
    expect(result).toBeUndefined();
  })
});

});
