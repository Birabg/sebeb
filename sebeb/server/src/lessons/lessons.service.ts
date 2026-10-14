import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddLessonDto, ReorderDto, UpdateLessonDto } from './dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async addLesson(courseId: string, dto: AddLessonDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) throw new NotFoundException('Course not found');

    const lastLesson = await this.prisma.lesson.findFirst({
      where: { course_id: courseId },
      orderBy: { sort_order: 'desc' },
      select: { sort_order: true },
    });
    const lesson = await this.prisma.lesson.create({
      data: {
        course_id: courseId,
        title: dto.title,
        description: dto.description,
        video_id: dto.videoId,
        duration_seconds: dto.durationSeconds,
        sort_order: (lastLesson?.sort_order ?? 0) + 1,
      },
    });

    return {
      success: true,
      message: 'Lesson created successfully',
      data: lesson,
    };
  }

  async getLessons(courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: { course_id: courseId, deleted_at: null },
      select: {
        id: true,
        course_id: true,
        title: true,
        description: true,
        sort_order: true,
        duration_seconds: true,
      },
    });

    return {
      success: true,
      message: 'Lessons retrieved successfully',
      data: lessons,
    };
  }

  async getAdminLessons(courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: { course_id: courseId },
    });

    return {
      success: true,
      message: 'Lessons retrieved successfully',
      data: lessons,
    };
  }

  async reorderLessons(courseId: string, dto: ReorderDto[]) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });

    if (!course) throw new NotFoundException('Course not found');
    for (const record of dto) {
      await this.prisma.lesson.update({
        where: { id: record.lessonId, course_id: courseId },
        data: {
          sort_order: record.sortOrder,
        },
      });
    }

    return {
      success: true,
      message: 'Lesson reordered successfully',
    };
  }

  async updateLesson(id: string, dto: UpdateLessonDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    await this.prisma.lesson.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        video_id: dto.videoId,
        duration_seconds: dto.durationSeconds,
      },
    });

    return {
      success: true,
      message: 'Lesson updated successfully',
    };
  }

  async softDeleteLesson(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    await this.prisma.lesson.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Lesson archived successfully',
    };
  }
  async restoreLesson(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    await this.prisma.lesson.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    });

    return {
      success: true,
      message: 'Lesson restored successfully',
    };
  }
}
