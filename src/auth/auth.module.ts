import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privatekey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publickey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privatekey: Buffer.from(privatekey, 'base64'),
          publicKey: Buffer.from(publickey, 'base64'),
        }
      },
    }),
  ],
})
export class AuthModule {}
