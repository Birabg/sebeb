import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  ChangeStatusDto,
  CreateCourseDto,
  GetCoursesDto,
  UpdateCourseDto,
} from './dto';
import { JwtAccessGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/auth/enums';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AdminCourseDetailResponseModel,
  AdminCourseListResponseModel,
  CourseCreatedResponseModel,
  ErrorResponseModel,
  MessageResponseModel,
} from '../swagger/swagger.models';
import { LessonsService } from 'src/lessons/lessons.service';
import { AddLessonDto, ReorderDto } from 'src/lessons/dto/lessons.dto';
import {
  AdminLessonListResponseModel,
  LessonCreatedResponseModel,
} from '../swagger/swagger.models';

@ApiTags('Admin Courses')
@Controller('/admin/courses')
export class AdminCourseController {
  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
  ) {}

  @Post()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a course' })
  @ApiBody({ type: CreateCourseDto, required: true })
  @ApiCreatedResponse({ type: CourseCreatedResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  addCourse(@Body() dto: CreateCourseDto) {
    return this.coursesService.addCourse(dto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'List courses for administration' })
  @ApiOkResponse({ type: AdminCourseListResponseModel })
  @ApiBadRequestResponse({
    description: 'One or more query parameters failed validation.',
    type: ErrorResponseModel,
  })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  getAdminCourses(@Query() dto: GetCoursesDto) {
    return this.coursesService.getAdminCourses(dto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get a course and all its lesson fields' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiOkResponse({ type: AdminCourseDetailResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  getAdminCourseById(@Param('id') id: string) {
    return this.coursesService.getAdminCourseById(id);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a course' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiBody({ type: UpdateCourseDto, required: true })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, dto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch(':id/publish')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Publish or unpublish a course' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiBody({ type: ChangeStatusDto, required: true })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
    return this.coursesService.changeStatus(id, dto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Archive a course' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  softDeleteCourse(@Param('id') id: string) {
    return this.coursesService.softDeleteCourse(id);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch(':id/restore')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Restore an archived course' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  restoreCourse(@Param('id') id: string) {
    return this.coursesService.restoreCourse(id);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Post('/:courseId/lessons')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add a lesson to a course' })
  @ApiParam({ name: 'courseId', description: 'Course UUID', format: 'uuid' })
  @ApiBody({ type: AddLessonDto, required: true })
  @ApiCreatedResponse({ type: LessonCreatedResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({
    description: 'Course not found.',
    type: ErrorResponseModel,
  })
  addLesson(@Param('courseId') courseId: string, @Body() dto: AddLessonDto) {
    return this.lessonsService.addLesson(courseId, dto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Get('/:courseId/lessons')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'List all lessons for a course, including archived lessons',
  })
  @ApiParam({ name: 'courseId', description: 'Course UUID', format: 'uuid' })
  @ApiOkResponse({ type: AdminLessonListResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  getAdminLesson(@Param('courseId') courseId: string) {
    return this.lessonsService.getAdminLessons(courseId);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch('/:courseId/lessons/reorder')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Set the sort order for course lessons' })
  @ApiParam({ name: 'courseId', description: 'Course UUID', format: 'uuid' })
  @ApiBody({ type: [ReorderDto], required: true })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({
    description: 'Course not found.',
    type: ErrorResponseModel,
  })
  reorderLessons(
    @Param('courseId') courseId: string,
    @Body() dto: ReorderDto[],
  ) {
    return this.lessonsService.reorderLessons(courseId, dto);
  }
}
