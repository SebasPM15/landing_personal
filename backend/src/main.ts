import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS con configuración adecuada
  app.enableCors({
    origin: '*', // Permite todos los orígenes (en producción especifica tu dominio frontend)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(process.env.PORT ?? 3500);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();