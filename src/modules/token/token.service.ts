import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LessThan } from 'typeorm';
import { Token } from './token.entity';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(private readonly repository: TokenRepository) {}

  private JWTKey(userID: number, jti: string): string {
    return `JWT[${userID}][${jti}]`;
  }

  async setJWTKey(
    userID: number,
    jti: string,
    duration: number,
    timestamp: number,
  ): Promise<void> {
    try {
      const key = this.JWTKey(userID, jti);
      const expAt: number = timestamp + duration;
      const newToken = plainToInstance(Token, {
        key,
        expAt,
      });
      await this.repository.save(newToken);
    } catch (error) {
      console.error('[setJWTKey] error', error);
    }
  }

  async checkJWTKey(userID: number, jti: string): Promise<boolean> {
    const token = await this.repository.findTokenByKey(
      this.JWTKey(userID, jti),
    );
    return !!token;
  }

  async deleteJWTKey(userID: number, jti: string): Promise<boolean> {
    return this.repository.delete({
      key: this.JWTKey(userID, jti),
    });
  }

  /**
   *
   * @param threshold the date which we want to delete jwt keys before in milliseconds
   */
  async deleteJWTKeysCreatedBeforeDate(threshold: number) {
    return this.repository.delete({
      createdAt: LessThan(new Date(threshold)),
    });
  }

  async deleteExpiredJWTKeys() {
    return this.repository.delete({
      expAt: LessThan(Date.now()),
    });
  }

  async deleteJWTKeysByUserID(userId: number) {
    return this.repository.delete({
      userId,
    });
  }
}
