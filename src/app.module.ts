import { Module } from '@nestjs/common'
import { PrismaServise } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  controllers: [CreateAccountController],
  providers: [PrismaServise],
})
export class AppModule {}
