import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [],//borro AppController
  providers: [],//borro AppService
})
export class AppModule {}
