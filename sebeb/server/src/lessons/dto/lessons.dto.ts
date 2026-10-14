import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AddLessonDto {
  @ApiProperty({ example: 'Linear equations' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Learn to solve linear equations.' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: 'video-123' })
  @IsNotEmpty()
  @IsString()
  videoId!: string;

  @ApiProperty({
    type: String,
    example: '600',
    description: 'Lesson duration in seconds as a decimal string.',
  })
  @IsNotEmpty()
  @IsDecimal()
  durationSeconds!: string;
}

export class ReorderDto {
  @ApiProperty({
    format: 'uuid',
    example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546',
  })
  @IsNotEmpty()
  @IsUUID()
  lessonId!: string;

  @ApiProperty({ example: 1, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  sortOrder!: number;
}

export class UpdateLessonDto {
  @ApiPropertyOptional({ example: 'Linear equations' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Learn to solve linear equations.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'video-123' })
  @IsOptional()
  @IsString()
  videoId?: string;

  @ApiPropertyOptional({
    type: String,
    example: '600',
    description: 'Lesson duration in seconds as a decimal string.',
  })
  @IsOptional()
  @IsDecimal()
  durationSeconds?: string;
}
