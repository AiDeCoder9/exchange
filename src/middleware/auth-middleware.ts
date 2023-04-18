import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly asyncLocalStorage: AsyncLocalStorage<any>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const tokenConfig = this.configService.get<TokenConfig>('token');
        const decoded = this.jwtService.verify(token, {
          secret: tokenConfig?.secret,
        });
        console.log(decoded, 'decoded');
        this.asyncLocalStorage.run({ token, id: decoded.sub }, () => next());
      } catch (err) {
        console.error(err);
        res.status(401).send({ message: 'Invalid token' });
      }
    } else {
      next();
    }
  }
}
