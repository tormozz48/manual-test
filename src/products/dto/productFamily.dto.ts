import { ApiProperty } from '@nestjs/swagger';

export class ProductFamilyDto {
  @ApiProperty({
    description: 'Unique identifier for the product family',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Unique code for the product family',
    example: 'SILDENAFIL',
  })
  code: string;

  @ApiProperty({
    description: 'Name of the product family',
    example: 'Sildenafil',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the category this product family belongs to',
    example: 1,
  })
  categoryId: number;
}
