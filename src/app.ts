import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { environment } from './environment';

async function shutdown() {
  console.info('Graceful shutdown ...');
  return  Promise.all([]);
}

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
    .setTitle(environment.appName)
    .setDescription('RSO docs')
    .setVersion('1.0')
    .addTag('rso')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  // Graceful server stop
  process.on('SIGTERM', () => {
    shutdown()
      .then(() => process.exit(0))
      .catch((err) => process.exit(1))
  });

  return app;
}

export const appBootstrap: Promise<INestApplication> = bootstrap();
