import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MyTokenAuthGuard } from 'src/common/guards/token.guard';
import { ResponseTool } from 'src/tools/response.tool';
import { GetUser } from '../user/decorator/getUser.decorator';
import { UserDTO } from '../user/dto/user.dto';
import { UserDocument } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AccessTokenResponse } from './dto/accessTokenResponse.dto';
import { LoginInput } from './dto/login-input.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOkResponse({
    type: AccessTokenResponse,
  })
  async signUp(@Body() userDto: UserDTO): Promise<AccessTokenResponse> {
    return this.authService.signUp(userDto);
  }

  @Post('/login')
  @ApiOkResponse({
    type: AccessTokenResponse,
  })
  async signIn(@Body() loginDTO: LoginInput): Promise<AccessTokenResponse> {
    return this.authService.signIn(loginDTO);
  }

  @Post('/logout')
  @ApiOkResponse()
  @UseGuards(MyTokenAuthGuard)
  async logout(@GetUser() user): Promise<{ message: string }> {
    return await this.authService.logout(user as UserDocument);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const response = await this.authService.resetPassword(email);
    return ResponseTool.POST_OK(response);
  }

  @Post('/google')
  @ApiOkResponse({
    type: AccessTokenResponse,
  })
  async googleAuth(@Body('tokenId') tokenId: string): Promise<boolean> {
    return true;
  }
}
