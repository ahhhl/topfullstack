import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

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
  const port = process.env.ADMIN_PORT || 5000;
  await app.listen(port);
}
bootstrap();
