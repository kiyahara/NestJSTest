import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      user,
      backendTokend: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '' + process.env.jwtSecretKeyTiming,
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '' + process.env.jwtRefreshTokenTiming,
          secret: process.env.jwtRefreshToken,
        }),
      },
    };
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      user,
      backendTokend: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '' + process.env.jwtSecretKeyTiming,
          secret: process.env.jwtSecretKey,
        }),
      },
    };
  }
}
