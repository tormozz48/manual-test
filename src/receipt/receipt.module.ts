import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptService } from './receipt.service';
import { AnswerReceipt } from './answerReceipt.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerReceipt]), ProductsModule],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
