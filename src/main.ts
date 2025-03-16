import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Manual Test API')
    .setDescription('API documentation for Manual Test application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((err) => console.error('Failed to start application:', err));
