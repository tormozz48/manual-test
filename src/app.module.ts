import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { ProductCategoriesModule } from './productCategories/productCategories.module';
import { ProductsModule } from './products/products.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ReceiptModule } from './receipt/receipt.module';

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
    ProductCategoriesModule,
    ProductsModule,
    QuizzesModule,
    ReceiptModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
