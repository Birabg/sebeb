import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto, UpdateProfileDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        password: hash,
        role: 'STUDENT',
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const { access_token, refresh_token } = await this.generateTokens(payload);

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        access_token,
        refresh_token,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase().trim(),
      },
    });

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isValid = await argon2.verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid Credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const { access_token, refresh_token } = await this.generateTokens(payload);

    return {
      success: true,
      message: 'User logged in successfully',
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          email: user.email,
          created_at: user.created_at,
        },
        access_token,
        refresh_token,
      },
    };
  }

  async generateAccessToken(payload: {
    sub: string;
    email: string;
    role: string;
  }) {
    return await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1d',
    });
  }

  async generateRefreshToken(payload: {
    sub: string;
    email: string;
    role: string;
  }) {
    return await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  async generateTokens(payload: { sub: string; email: string; role: string }) {
    const [access_token, refresh_token] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    const hashToken = await argon2.hash(refresh_token);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        user_id: payload.sub,
        token_hash: hashToken,
        expires_at: expiresAt,
      },
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async logout(data: { userId: string; incomingToken: string }) {
    const activeTokens = await this.prisma.refreshToken.findMany({
      where: { user_id: data.userId, revoked_at: null },
    });

    let matched: RefreshToken | null = null;
    for (const record of activeTokens) {
      if (await argon2.verify(record.token_hash, data.incomingToken)) {
        matched = record;
        break;
      }
    }
    if (matched) {
      await this.prisma.refreshToken.update({
        where: { id: matched.id },
        data: {
          revoked_at: new Date(),
        },
      });
    }

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Profile fetched successfully',
      data: user,
    };
  }

  async updateMe(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'User profile updated successfully',
    };
  }
}
