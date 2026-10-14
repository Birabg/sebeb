import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChangeStatusDto,
  CreateCourseDto,
  GetCoursesDto,
  PublishStatus,
  Sort,
  UpdateCourseDto,
} from './dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async addCourse(dto: CreateCourseDto) {
    const course = await this.prisma.course.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        cover_image: dto.coverImage,
        is_published: dto.isPublished,
      },
    });

    return {
      success: true,
      message: 'Course Created Successfully',
      data: course,
    };
  }

  async getCourses(dto: GetCoursesDto) {
    const courses = await this.prisma.course.findMany({
      where: {
        ...(dto.q && {
          OR: [
            {
              title: {
                contains: dto.q,
              },
            },
            {
              description: {
                contains: dto.q,
              },
            },
          ],
        }),

        price: {
          gte: dto.price_min,
          lte: dto.price_max,
        },

        is_published: true,
        deleted_at: null,
      },
      orderBy:
        dto.sort === Sort.newest
          ? { created_at: 'desc' }
          : dto.sort === Sort.price_asc
            ? { price: 'asc' }
            : dto.sort === Sort.price_desc
              ? { price: 'desc' }
              : undefined,
      omit: {
        updated_at: true,
      },
    });

    return {
      success: true,
      message: 'Courses retrieved successfully',
      data: courses,
    };
  }

  async getAdminCourses(dto: GetCoursesDto) {
    const isPublished =
      dto.status === PublishStatus.all
        ? undefined
        : dto.status === PublishStatus.draft
          ? false
          : true;
    const courses = await this.prisma.course.findMany({
      where: {
        ...(dto.q && {
          OR: [
            {
              title: {
                contains: dto.q,
              },
            },
            {
              description: {
                contains: dto.q,
              },
            },
          ],
        }),

        price: {
          gte: dto.price_min,
          lte: dto.price_max,
        },

        is_published: isPublished,
      },
      orderBy:
        dto.sort === Sort.newest
          ? { created_at: 'desc' }
          : dto.sort === Sort.price_asc
            ? { price: 'asc' }
            : dto.sort === Sort.price_desc
              ? { price: 'desc' }
              : undefined,
    });

    return {
      success: true,
      message: 'Courses retrieved successfully',
      data: courses,
    };
  }

  async getCourseById(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId, is_published: true, deleted_at: null },
      omit: {
        updated_at: true,
        deleted_at: true,
        is_published: true,
      },
      include: {
        lessons: {
          omit: {
            video_id: true,
          },
        },
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    return {
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    };
  }

  async getAdminCourseById(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: true,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    return {
      success: true,
      message: 'Course retrieved successfully',
      data: course,
    };
  }

  async updateCourse(courseId: string, dto: UpdateCourseDto) {
    const course = await this.prisma.course.update({
      where: { id: courseId },
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        cover_image: dto.coverImage,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    return {
      success: true,
      message: 'Course updated successfully',
    };
  }

  async changeStatus(courseId: string, dto: ChangeStatusDto) {
    const course = await this.prisma.course.update({
      where: { id: courseId },
      data: {
        is_published: dto.isPublished,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    return {
      success: true,
      message: 'Course status changed successfully',
    };
  }

  async softDeleteCourse(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const now = new Date();

    await this.prisma.$transaction([
      this.prisma.course.update({
        where: { id: courseId },
        data: {
          deleted_at: now,
        },
      }),

      this.prisma.lesson.updateMany({
        where: {
          course_id: courseId,
          deleted_at: null,
        },
        data: {
          deleted_at: now,
        },
      }),
    ]);

    return {
      success: true,
      message: 'Course archived successfully',
    };
  }

  async restoreCourse(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    await this.prisma.$transaction([
      this.prisma.course.update({
        where: { id: courseId },
        data: {
          deleted_at: null,
        },
      }),

      this.prisma.lesson.updateMany({
        where: { course_id: courseId },
        data: {
          deleted_at: null,
        },
      }),
    ]);
    return {
      success: true,
      message: 'Course restored successfully',
    };
  }
}
