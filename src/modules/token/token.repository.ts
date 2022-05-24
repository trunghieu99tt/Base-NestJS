import { FindOptionsWhere, Repository } from 'typeorm';
import { Token } from './token.entity';

export class TokenRepository extends Repository<Token> {
  async findTokenByKey(
    key: string,
    selections?: (keyof Token)[],
  ): Promise<Token> {
    return this.findOne({ where: { key }, select: selections });
  }

  async delete(conditions: FindOptionsWhere<Token>) {
    try {
      const response = await this.delete(conditions);
      return response.affected > 0;
    } catch (error) {
      console.error('[TokenRepository delete] error', error);
    }
  }
}
