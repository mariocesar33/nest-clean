import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserPayload } from './jwt.strategy'

// createParamDecorator => porque não estou criando um decorator para uma classe, mas sim para um parametro de uma função.
export const CurrentUser = createParamDecorator(
  // primeiro parametro são os parametros para enviar para o decorator,
  // por exemplo pegar só o id do usuário @CurrentUser('sub'), e nesse caso não estou tendo nenhum parametro no primeiro
  // segungo parametro é o context que traz o conteudo da nossa requizição
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)
