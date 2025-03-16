import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptService } from './receipt.service';
import { AnswerReceipt } from './answerReceipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerReceipt])],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
