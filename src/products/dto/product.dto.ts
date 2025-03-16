import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Sildenafil',
  })
  name: string;

  @ApiProperty({
    description: 'Dosage amount of the product',
    example: 50,
  })
  doze: number;

  @ApiProperty({
    description: 'Unit of measurement for the dosage',
    example: 'mg',
  })
  unit: string;

  @ApiProperty({
    description: 'Display title of the product',
    example: 'Sildenafil 50mg',
  })
  title: string;

  @ApiProperty({
    description: 'ID of the category this product belongs to',
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    description:
      'ID of the product family this product belongs to, or null if not part of a family',
    example: 1,
    nullable: true,
  })
  familyId: number | null;
}
