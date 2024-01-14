import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenSchema = z.object({
  sub: z.string().uuid(),
})

export type TokenSchema = z.infer<typeof tokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    // "super" Para poder chamar o construtor da class "PassportStrategy"
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // de onde estou pegando o token
      secretOrKey: Buffer.from(publicKey, 'base64'), // chave publico
      algorithms: ['RS256'], // o algurtimo que utilizei
    })
  }

  // validar que o token possui asinformações dentro do PAYLOAD necessarias para que a minha aplicação funcione
  async validate(payload: TokenSchema) {
    // Se o token que o usuário esta enviando apesar de ser valido em relação ao "publicKey",
    // se não possuir dentro do seu "payload" o id do usuário, ele vai dar erro.
    // e não vai permitir que esse token seja utilizado.
    return tokenSchema.parse(payload)
  }
}
