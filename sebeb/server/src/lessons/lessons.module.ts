import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { AdminLessonsController } from './admin-lesson.controller';

@Module({
  controllers: [LessonsController, AdminLessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
