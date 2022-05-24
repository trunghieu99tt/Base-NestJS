import { Module } from '@nestjs/common';
import { OrmModule } from './orm/orm.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [OrmModule, RedisModule],
  providers: [],
  exports: [OrmModule, RedisModule],
})
export class SharedModule {}
