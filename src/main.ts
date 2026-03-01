import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './global-exception/global-exception.filter';
import { Logger } from 'winston';
import { HttpAdapterHost } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new GlobalExceptionFilter(logger as Logger, httpAdapterHost),
  );

  const config = new DocumentBuilder()
    .setTitle('Basic')
    .setDescription('The Basic API description')
    .setVersion('1.0')
    .addCookieAuth('token')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  const configService = app.get(ConfigService);

  // Old ways
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});

// TODO - NestJS Learning Progress:
//
// COMPLETED:
// [x] Controllers, Services, Modules - Basic building blocks
// [x] Middleware - Request/Response intercepting (LogMiddleware)
// [x] Interceptors - Transform response (TimeInterceptor)
// [x] Exception Filters - Global error handling (GlobalExceptionFilter)
// [x] Pipes - Validation with class-validator (ValidationPipe)
// [x] DTOs - Data Transfer Objects with validation
// [x] ConfigModule - Environment variables management
// [x] Swagger - API documentation (@nestjs/swagger)
// [x] Logging - Winston logger integration (nest-winston)
// [x] Cookies - Cookie handling (cookie-parser)
// [x] Database - Prisma ORM integration
// [x] Repository Pattern - Data access layer abstraction
// [x] Dynamic Modules - forRoot pattern (ValidationModule.forRoot)
//
// SECURITY (Required for Production):
// [ ] Guards - Authentication & Authorization (JWT, Passport, Role-based access)
// [ ] Helmet - Security headers (npm i helmet)
// [ ] CORS - Cross-Origin Resource Sharing (app.enableCors())
// [ ] Rate Limiting / Throttling - Prevent DDoS (@nestjs/throttler)
//
// ADVANCED FEATURES:
// [ ] Custom Decorators - Create custom decorators (@CurrentUser, @Roles, etc)
// [ ] Caching - Redis/In-memory caching (@nestjs/cache-manager)
// [ ] API Versioning - Version control for API (app.enableVersioning())
// [ ] File Upload - Handle file uploads with Multer
// [ ] Health Checks - Monitoring endpoint (@nestjs/terminus)
// [ ] Compression - Gzip response (compression middleware)
//
// REAL-TIME & ASYNC:
// [ ] WebSockets - Real-time communication (@nestjs/websockets)
// [ ] Task Scheduling - Cron jobs (@nestjs/schedule)
// [ ] Queue / Bull - Background jobs & message queue (@nestjs/bull)
// [ ] Server-Sent Events (SSE) - One-way real-time updates
