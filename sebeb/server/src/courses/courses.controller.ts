import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { GetCoursesDto } from './dto';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorResponseModel,
  PublicCourseDetailResponseModel,
  PublicLessonListResponseModel,
  PublicCourseListResponseModel,
} from '../swagger/swagger.models';
import { JwtAccessGuard } from 'src/auth/guard';
import { LessonsService } from 'src/lessons/lessons.service';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
  ) {}

  // public
  @Get()
  @ApiOperation({ summary: 'List published courses' })
  @ApiOkResponse({ type: PublicCourseListResponseModel })
  @ApiBadRequestResponse({
    description: 'One or more query parameters failed validation.',
    type: ErrorResponseModel,
  })
  getCourses(@Query() dto: GetCoursesDto) {
    return this.coursesService.getCourses(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a published course and its lessons' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiOkResponse({ type: PublicCourseDetailResponseModel })
  @ApiNotFoundResponse({
    description: 'Course not found or not publicly available.',
    type: ErrorResponseModel,
  })
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @UseGuards(JwtAccessGuard)
  @Get('/:courseId/lessons')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'List active lessons for a course' })
  @ApiParam({ name: 'courseId', description: 'Course UUID', format: 'uuid' })
  @ApiOkResponse({ type: PublicLessonListResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  getCourseLesson(@Param('courseId') courseId: string) {
    return this.lessonsService.getLessons(courseId);
  }
}
