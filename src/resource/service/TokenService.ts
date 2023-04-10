import Singleton from '@/decorator/singleton.decorator';
import jwt from 'jsonwebtoken';

@Singleton
export class TokenService {
  private handleSignToken = (
    payload: { [key: string]: any; sub: string },
    tokenSecret: string,
    expiry: string,
  ) => {
    try {
      return jwt.sign({ ...payload }, tokenSecret, {
        algorithm: 'HS256',
        expiresIn: expiry,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  signToken = (userData: { [key: string]: any }, sub: string) => {
    const payload = { ...userData, sub };
    return this.handleSignToken(
      payload,
      process.env.TOKEN_SECRET as string,
      process.env.TOKEN_EXPIRY as string,
    );
  };

  signRefreshToken = (userData: { [key: string]: any }, sub: string) => {
    const payload = { ...userData, sub };
    return this.handleSignToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      process.env.REFRESH_TOKEN_EXPIRY as string,
    );
  };
}
