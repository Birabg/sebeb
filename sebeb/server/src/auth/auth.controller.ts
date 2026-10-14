import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdateProfileDto } from './dto';
import { JwtAccessGuard, JwtRefreshGuard } from './guard';
import type { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthResponseModel,
  ErrorResponseModel,
  MessageResponseModel,
  ProfileResponseModel,
} from '../swagger/swagger.models';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a student account' })
  @ApiBody({ type: RegisterDto, required: true })
  @ApiCreatedResponse({ type: AuthResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in and receive access and refresh tokens' })
  @ApiBody({ type: LoginDto, required: true })
  @ApiCreatedResponse({ type: AuthResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
    type: ErrorResponseModel,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  @ApiBearerAuth('refresh-token')
  @ApiOperation({ summary: 'Revoke the presented refresh token' })
  @ApiCreatedResponse({ type: MessageResponseModel })
  @ApiUnauthorizedResponse({
    description: 'A valid refresh-token bearer credential is required.',
    type: ErrorResponseModel,
  })
  logout(@Req() req: Request) {
    const user = req.user as { id: string; refreshToken: string };
    return this.authService.logout({
      userId: user.id,
      incomingToken: user.refreshToken,
    });
  }

  @UseGuards(JwtAccessGuard)
  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({ type: ProfileResponseModel })
  @ApiUnauthorizedResponse({
    description: 'A valid access-token bearer credential is required.',
    type: ErrorResponseModel,
  })
  @ApiNotFoundResponse({
    description: 'The authenticated user no longer exists.',
    type: ErrorResponseModel,
  })
  getMe(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.authService.getMe(user.id);
  }

  @UseGuards(JwtAccessGuard)
  @Patch('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update the authenticated user profile' })
  @ApiBody({ type: UpdateProfileDto, required: true })
  @ApiOkResponse({ type: MessageResponseModel })
  @ApiBadRequestResponse({ type: ErrorResponseModel })
  @ApiUnauthorizedResponse({
    description: 'A valid access-token bearer credential is required.',
    type: ErrorResponseModel,
  })
  @ApiNotFoundResponse({
    description: 'The authenticated user no longer exists.',
    type: ErrorResponseModel,
  })
  updateMe(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const user = req.user as { id: string };
    return this.authService.updateMe(user.id, dto);
  }
}
