/* para realizar validaciones con DTOs (Data Transfer Objects)
 en NestJS es necesario utilizar class-validator, que es 
 una librería de validación que te permite definir reglas
  y restricciones para tus DTOs y validar los datos 
  recibidos en las solicitudes.*/

/*Para utilizar class-validator en NestJS, primero, 
debes instalarlo como una dependencia en tu proyecto.
comando: npm i class-validator class-transformer */
import { IsString,IsNotEmpty,IsNumber } from "class-validator";
import { Expose } from "class-transformer";
/*Cuando se realiza una transformación utilizando class-transformer,
 solo las propiedades decoradas con @Expose() se considerarán
  durante el proceso de transformación, mientras que las 
  propiedades que no están marcadas se omitirán a menos
   que se especifique lo contrario con opciones adicionales 
   en las funciones de transformación.*/

import { PartialType } from "@nestjs/mapped-types";
/* PartialType se utiliza para crear DTOs parciales para 
cuando se utiliza el metodo patch en lo que necesito modificar
solo un dato y no todo el objeto*/
export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly nombre:string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly marca:string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly modelo:string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    readonly categoria:string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    readonly valor: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}


