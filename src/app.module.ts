import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductCategoriesModule } from './productCategories/productCategories.module';
import { ProductsModule } from './products/products.module';
import { ProductFamiliesModule } from './productFamilies/productFamilies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'data', 'database.sqlite'),
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,
      autoLoadEntities: true,
      migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
      migrationsRun: process.env.NODE_ENV === 'production',
    }),
    UsersModule,
    ProductCategoriesModule,
    ProductsModule,
    ProductFamiliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
