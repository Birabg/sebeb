import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to Algebra' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'A beginner-friendly algebra course.' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    type: String,
    example: '49.99',
    description: 'Course price as a decimal string.',
  })
  @IsDecimal()
  @IsNotEmpty()
  price!: string;

  @ApiProperty({ example: 'https://example.com/algebra.jpg' })
  @IsString()
  @IsNotEmpty()
  coverImage!: string;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export enum Sort {
  newest = 'newest',
  price_asc = 'price_asc',
  price_desc = 'price_desc',
}

export enum PublishStatus {
  all = 'all',
  draft = 'draft',
  published = 'published',
}

export class GetCoursesDto {
  @ApiPropertyOptional({ example: 'algebra' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: Sort, enumName: 'CourseSort' })
  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;

  @ApiPropertyOptional({ type: String, example: '10.00' })
  @IsOptional()
  @IsString()
  price_min?: string;

  @ApiPropertyOptional({ type: String, example: '100.00' })
  @IsOptional()
  @IsString()
  price_max?: string;

  @ApiPropertyOptional({
    enum: PublishStatus,
    enumName: 'CoursePublishStatus',
    description: 'Admin filter; omitted defaults to published courses.',
    default: PublishStatus.published,
  })
  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}

export class UpdateCourseDto {
  @ApiPropertyOptional({ example: 'Introduction to Algebra' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'A beginner-friendly algebra course.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: String,
    example: '59.99',
    description: 'Course price as a decimal string.',
  })
  @IsOptional()
  @IsDecimal()
  price?: string;

  @ApiPropertyOptional({ example: 'https://example.com/algebra.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;
}

export class ChangeStatusDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isPublished!: boolean;
}
