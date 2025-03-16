import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFamily } from './productFamily.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductFamily])],
  providers: [],
  exports: [],
})
export class ProductFamiliesModule {}
