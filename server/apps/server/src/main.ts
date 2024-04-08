import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  // useStaticAssets(publicPath, options)
  // app.useStaticAssets('uploads', {
  //   prefix: '/uploads',
  // });

  const config = new DocumentBuilder()
    .setTitle('接口API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  console.log(process.env.SERVER_PORT);

  const port = process.env.SERVER_PORT || 5001;
  await app.listen(port);
}
bootstrap();
