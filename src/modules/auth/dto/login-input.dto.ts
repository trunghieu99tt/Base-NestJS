import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginInput {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
