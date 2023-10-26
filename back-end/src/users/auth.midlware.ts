import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from './constants';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
   let [type, token] = req.headers.authorization?.split(' ') ?? [];
   token = type === 'Bearer' ? token : undefined;

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

     req['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
};