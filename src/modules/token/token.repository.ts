import { FindOptionsWhere, Repository } from 'typeorm';
import { Token } from './token.entity';

export class TokenRepository extends Repository<Token> {
  async delete(conditions: FindOptionsWhere<Token>) {
    try {
      const response = await this.delete(conditions);
      return response.affected > 0;
    } catch (error) {
      console.error('[TokenRepository delete] error', error);
    }
  }
}
