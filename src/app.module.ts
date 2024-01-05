import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { PrismaServise } from './prisma/prisma.service'
import { envSchema } from './env'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [CreateAccountController],
  providers: [PrismaServise],
})
export class AppModule {}
