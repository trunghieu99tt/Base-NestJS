import { forwardRef, NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getConnectionToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import {
  clearMongodb,
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'test/mongodb-memory';
import { JWT_EXP, JWT_SECRET } from '../../../shared/config/env';
import { TokenModule } from '../../token/token.module';
import { TokenService } from '../../token/token.service';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/user.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { authUser } from '../__mock/auth.data';

describe('Auth service', () => {
  let moduleRef: TestingModule;
  let authService: AuthService;
  let connection: Connection;
  let userService: UserService;
  let tokenService: TokenService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        forwardRef(() => UserModule),
        forwardRef(() => TokenModule),
        PassportModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: JWT_EXP,
          },
        }),
      ],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
      exports: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    tokenService = moduleRef.get<TokenService>(TokenService);
    connection = await moduleRef.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
    moduleRef.close();
    await closeInMongodConnection();
  });

  afterEach(async () => {
    await clearMongodb(connection);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('generateAccessToken', () => {
    it('should return access token', async () => {
      const newUser = await userService.createUser(authUser);
      const token = await authService.generateAccessToken(newUser._id);
      expect(token).toBeDefined();
    });
  });

  describe('signUp', () => {
    it('should create new user', async () => {
      const newUser = await authService.signUp({
        name: authUser.name,
        email: authUser.email,
        username: authUser.username,
        bio: authUser.bio,
        gender: authUser.gender,
        avatar: authUser.avatar,
        coverPhoto: authUser.coverPhoto,
        password: authUser.password,
        passwordConfirm: authUser.passwordConfirm,
      });

      expect(newUser).toBeDefined();
    });
  });

  describe('signin', () => {
    it('should return user info and access token', async () => {
      await userService.createUser(authUser);
      const user = await userService.findByEmail(authUser.email);
      const { user: responseUser, accessToken } = await authService.signIn({
        username: user.username,
        password: authUser.password,
      });
      expect(responseUser).toEqual(user);
      expect(accessToken).toBeDefined();
    });

    it('should throw error if user not found', async () => {
      await userService.createUser(authUser);
      await expect(
        authService.signIn({
          username: 'not-found',
          password: authUser.password,
        }),
      ).rejects.toThrow(new NotFoundException('User not found'));
    });

    it('should throw error if password is not correct', async () => {
      await userService.createUser(authUser);
      await expect(
        authService.signIn({
          username: authUser.username,
          password: 'wrong-password',
        }),
      ).rejects.toThrow(new NotFoundException('Wrong username/password'));
    });
  });

  // describe('resetPassword', () => {
  //   it('should reset password', async () => {
  //     await userService.createUser(authUser);
  //     const response = await authService.resetPassword(authUser.email);
  //     expect(response).toBeDefined();
  //     expect(response.message).toBe('OK');
  //   });
  // });
});
