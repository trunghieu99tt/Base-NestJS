import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXP } from 'src/common/config/env';
import { SMTPMailer } from 'src/common/tool/mailer.tool';
import { v4 as uuid } from 'uuid';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { PayloadDTO } from './dto/access-token-payload.dto';
import { AccessTokenResponse } from './dto/accessTokenResponse.dto';
import { LoginInput } from './dto/login-input.dto';
import { SignUpInput } from './dto/signup-input.dto';
import { AuthTool } from './tool/auth.tool';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  // create jwt access token based on userId
  async generateAccessToken(
    userId: number,
    timestamp: number = Date.now(),
  ): Promise<string> {
    const jti = uuid();
    const payload = {
      sub: userId,
      jti,
    } as PayloadDTO;

    await this.tokenService.setJWTKey(userId, jti, JWT_EXP, timestamp);
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async signUp(
    input: SignUpInput,
    timestamp: number = Date.now(),
  ): Promise<AccessTokenResponse> {
    const newUser = await this.userService.createUser(input);
    const accessToken = await this.generateAccessToken(newUser.id, timestamp);
    return {
      user: newUser,
      accessToken,
    };
  }

  async signIn(
    loginDto: LoginInput,
    timestamp: number = Date.now(),
  ): Promise<AccessTokenResponse> {
    const { username, password } = loginDto;
    const user = await this.userService.findByUsernameOrEmail(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong username/password');
    }
    const accessToken = await this.generateAccessToken(user.id, timestamp);
    return {
      user,
      accessToken,
    };
  }

  async logout(user: UserDocument): Promise<{ message: string }> {
    try {
      await this.tokenService.deleteJWTKey(user.id, user.jti);
      // delete all expired tokens
      await this.tokenService.deleteExpiredJWTKeys();
      return {
        message: 'Good bye :)',
      };
    } catch (error) {
      console.error(error);
    }
  }

  async resetPassword(email: string) {
    const user = await this.userService.findByUsernameOrEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const token = AuthTool.randomToken(6);

      // delete all tokens of this user
      await this.tokenService.deleteJWTKeysByUserID(user._id);
      await this.userService.updateUser(user._id, {
        password: token,
      });

      SMTPMailer.sendMail(
        user.email,
        'Quen mat khau',
        EmailTool.resetPasswordEmail(user.name, user.username, token),
      );
      return {
        message: 'OK',
      };
    } catch (error) {
      console.log(`error`, error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
