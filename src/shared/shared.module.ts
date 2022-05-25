import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception-filter';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { AppLoggerModule } from './logger/logger.module';
import { OrmModule } from './orm/orm.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), OrmModule, RedisModule, AppLoggerModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [OrmModule, RedisModule, AppLoggerModule, ConfigModule],
})
export class SharedModule {}
