import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { AdminCourseController } from './admin-course.controller';
import { LessonsService } from 'src/lessons/lessons.service';

@Module({
  controllers: [CoursesController, AdminCourseController],
  providers: [CoursesService, LessonsService],
})
export class CoursesModule {}
