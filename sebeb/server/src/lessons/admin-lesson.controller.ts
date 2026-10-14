import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAccessGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/auth/enums';
import { UpdateLessonDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorResponseModel,
  MessageResponseModel,
} from '../swagger/swagger.models';

@ApiTags('Admin Lessons')
@Controller('/admin/lessons')
export class AdminLessonsController {
  constructor(private lessonsService: LessonsService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson UUID', format: 'uuid' })
  @ApiBody({ type: UpdateLessonDto, required: true })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.updateLesson(id, dto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Archive a lesson' })
  @ApiParam({ name: 'id', description: 'Lesson UUID', format: 'uuid' })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  softDeleteLesson(@Param('id') id: string) {
    return this.lessonsService.softDeleteLesson(id);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Patch('/:id/restore')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Restore an archived lesson' })
  @ApiParam({ name: 'id', description: 'Lesson UUID', format: 'uuid' })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiUnauthorizedResponse({ type: ErrorResponseModel })
  @ApiForbiddenResponse({ type: ErrorResponseModel })
  @ApiNotFoundResponse({ type: ErrorResponseModel })
  restoreLesson(@Param('id') id: string) {
    return this.lessonsService.restoreLesson(id);
  }
}
