import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AUTH_HEADER } from './modules/auth/constants/strategy.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  /** Swagger configuration*/
  const options = new DocumentBuilder()
    .setTitle('Stream2Earn API')
    .setDescription('Stream2Earn API')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .addApiKey(
      {
        name: AUTH_HEADER.API_KEY,
        in: 'header',
        type: 'apiKey',
      },
      AUTH_HEADER.API_KEY,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get<number>('port');
  console.log('port', port);
  await app.listen(port);
}
bootstrap();
