import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Test Blog on NESTJS')
  .setDescription('Blog API')
  .setVersion('0.1')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build()