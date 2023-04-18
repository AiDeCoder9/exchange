import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sendGrid from '@sendgrid/mail';
import { UserEntity } from '../user-management/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerificationEmail(email: string, password: string) {
    const payload = { email };
    console.log(payload);
    const tokenConfig = this.configService.get<TokenConfig>('token');
    const url = this.configService.get<string>('applicationURL');
    const port = this.configService.get<string>('port');
    const token = await this.jwtService.signAsync(payload, {
      secret: tokenConfig?.secret,
      expiresIn: tokenConfig?.expiry,
    });
    const confirmationUrl = `${url}:${port}/email-verification/${token}`;
    console.log(confirmationUrl, 'confirmation url');
    sendGrid.setApiKey(process.env.MAIL_API_KEY as string);
    const msg = {
      to: email,
      from: process.env.MAIL_SENDER as string,
      subject: 'Verify your Email',
      text: 'Welcome to Exchange Platform. Exchange everything and anything',
      html: `
      <div>
        <p>Login using your temporary password and email</p>
        <h6>Temporary Password</h6>
        <p>${password}</p>
      </div>
      `,
    };
    sendGrid
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async resendVerificationLink(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user?.isEmailVerified) {
      throw new BadRequestException('Email is already verified');
    }
    await this.sendVerificationEmail(email, password);
  }
  async markEmailAsVerified(token: string) {
    const email = await this.decodeVerificationToken(token);
    await this.userRepository.update(
      { email },
      {
        isEmailVerified: true,
      },
    );
  }
  async decodeVerificationToken(token: string) {
    try {
      const tokenConfig = this.configService.get<TokenConfig>('token');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: tokenConfig?.secret,
      });
      if ('email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
