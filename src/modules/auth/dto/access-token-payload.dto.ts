import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PayloadDTO {
  @IsNumber()
  @Type(() => Number)
  readonly sub: number;

  @IsNumber()
  @Type(() => Number)
  readonly exp: number;

  @IsNumber()
  @Type(() => Number)
  readonly jti: string;
}
