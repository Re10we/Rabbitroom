import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const accessToken = request.cookies.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      request['user'] = payload;
    } catch {
      const refresh_token = request.cookies.refreshToken;

      try {
        const { idUser, username } = await this.jwtService.verifyAsync(
          refresh_token,
          {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          },
        );

        const payload = { idUser: idUser, username: username };

        const refreshedAccessToken = await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        });

        response.cookie('accessToken', refreshedAccessToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'strict',
          maxAge:
            parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES) *
            24 *
            60 *
            60 *
            1000,
        });

        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
    }
    return true;
  }
}
