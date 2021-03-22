import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { swaggerOptions } from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('test', app, document)


  await app.listen(process.env.PORT)
}
bootstrap()
