import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptService } from './receipt.service';
import { AnswerReceipt } from './answerReceipt.entity';
import { ProductCategoriesModule } from '../productCategories/productCategories.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerReceipt]), ProductCategoriesModule],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
