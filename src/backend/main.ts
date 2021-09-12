import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerModule } from './server.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || '5000';
  const app = await NestFactory.create(ServerModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Kaifstore')
    .setDescription('REST V1 API documentation')
    .setTitle('v1.0.0')
    .addTag('backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
}

bootstrap();
