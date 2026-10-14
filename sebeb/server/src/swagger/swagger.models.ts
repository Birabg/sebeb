import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../auth/enums';

export class UserResponseModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: 'Ada' })
  first_name!: string;

  @ApiProperty({ example: 'Lovelace' })
  last_name!: string;

  @ApiProperty({ example: 'ada@example.com' })
  email!: string;

  @ApiProperty({ enum: Role, enumName: 'Role', example: Role.STUDENT })
  role!: Role;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at!: Date;
}

export class AuthDataResponseModel {
  @ApiProperty({ type: UserResponseModel })
  user!: UserResponseModel;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token!: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refresh_token!: string;
}

export class AuthResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'User logged in successfully' })
  message!: string;

  @ApiProperty({ type: AuthDataResponseModel })
  data!: AuthDataResponseModel;
}

export class ProfileResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Profile fetched successfully' })
  message!: string;

  @ApiProperty({ type: UserResponseModel })
  data!: UserResponseModel;
}

export class MessageResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message!: string;
}

export class CourseResponseModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: 'Introduction to Algebra' })
  title!: string;

  @ApiProperty({ example: 'A beginner-friendly algebra course.' })
  description!: string;

  @ApiProperty({ type: String, example: '49.99' })
  price!: string;

  @ApiProperty({ example: 'https://example.com/algebra.jpg' })
  cover_image!: string;

  @ApiProperty({ example: false })
  is_published!: boolean;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updated_at!: Date;

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  deleted_at!: Date | null;
}

export class PublicCourseListItemResponseModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: 'Introduction to Algebra' })
  title!: string;

  @ApiProperty({ example: 'A beginner-friendly algebra course.' })
  description!: string;

  @ApiProperty({ type: String, example: '49.99' })
  price!: string;

  @ApiProperty({ example: 'https://example.com/algebra.jpg' })
  cover_image!: string;

  @ApiProperty({ example: true })
  is_published!: boolean;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  deleted_at!: Date | null;
}

export class LessonResponseModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  course_id!: string;

  @ApiProperty({ example: 'Linear equations' })
  title!: string;

  @ApiProperty({ example: 'Learn to solve linear equations.' })
  description!: string;

  @ApiProperty({ example: 'video-123' })
  video_id!: string;

  @ApiProperty({ type: String, example: '600' })
  duration_seconds!: string;

  @ApiProperty({ example: 1 })
  sort_order!: number;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updated_at!: Date;

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  deleted_at!: Date | null;
}

export class PublicLessonResponseModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  course_id!: string;

  @ApiProperty({ example: 'Linear equations' })
  title!: string;

  @ApiProperty({ example: 'Learn to solve linear equations.' })
  description!: string;

  @ApiProperty({ type: String, example: '600' })
  duration_seconds!: string;

  @ApiProperty({ example: 1 })
  sort_order!: number;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updated_at!: Date;

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  deleted_at!: Date | null;
}

export class AdminCourseListResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Courses retrieved successfully' })
  message!: string;

  @ApiProperty({ type: CourseResponseModel, isArray: true })
  data!: CourseResponseModel[];
}

export class PublicCourseListResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Courses retrieved successfully' })
  message!: string;

  @ApiProperty({ type: PublicCourseListItemResponseModel, isArray: true })
  data!: PublicCourseListItemResponseModel[];
}

export class CourseCreatedResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Course Created Successfully' })
  message!: string;

  @ApiProperty({ type: CourseResponseModel })
  data!: CourseResponseModel;
}

export class PublicCourseDetailModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: 'Introduction to Algebra' })
  title!: string;

  @ApiProperty({ example: 'A beginner-friendly algebra course.' })
  description!: string;

  @ApiProperty({ type: String, example: '49.99' })
  price!: string;

  @ApiProperty({ example: 'https://example.com/algebra.jpg' })
  cover_image!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ type: PublicLessonResponseModel, isArray: true })
  lessons!: PublicLessonResponseModel[];
}

export class AdminCourseDetailModel extends CourseResponseModel {
  @ApiProperty({ type: LessonResponseModel, isArray: true })
  lessons!: LessonResponseModel[];
}

export class PublicCourseDetailResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Course retrieved successfully' })
  message!: string;

  @ApiProperty({ type: PublicCourseDetailModel })
  data!: PublicCourseDetailModel;
}

export class AdminCourseDetailResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Course retrieved successfully' })
  message!: string;

  @ApiProperty({ type: AdminCourseDetailModel })
  data!: AdminCourseDetailModel;
}

export class ErrorResponseModel {
  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    example: 'Validation failed',
  })
  message!: string | string[];

  @ApiProperty({ example: 'Bad Request' })
  error!: string;
}

export class PublicLessonListItemResponseModel {
  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  id!: string;

  @ApiProperty({ example: '9a5cfc86-47c1-4aed-8d33-4bedf14c2546' })
  course_id!: string;

  @ApiProperty({ example: 'Linear equations' })
  title!: string;

  @ApiProperty({ example: 'Learn to solve linear equations.' })
  description!: string;

  @ApiProperty({ example: 1 })
  sort_order!: number;

  @ApiProperty({ type: String, example: '600' })
  duration_seconds!: string;
}

export class LessonCreatedResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Lesson created successfully' })
  message!: string;

  @ApiProperty({ type: LessonResponseModel })
  data!: LessonResponseModel;
}

export class AdminLessonListResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Lessons retrieved successfully' })
  message!: string;

  @ApiProperty({ type: LessonResponseModel, isArray: true })
  data!: LessonResponseModel[];
}

export class PublicLessonListResponseModel {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Lessons retrieved successfully' })
  message!: string;

  @ApiProperty({ type: PublicLessonListItemResponseModel, isArray: true })
  data!: PublicLessonListItemResponseModel[];
}
