import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { userRoutes } from './routes/user'

async function bootstrap() {
    const fastify = Fastify({
        // Logs da aplicação
        logger: true,
    })

    /* Hailita qualquer aplicação a consumir o backend. 
    Se fosse em produção, no lugar de 'origin' colocaríamos
    o domínio do site para que apenas ele consumisse o backend
    */
    await fastify.register(cors, {
        origin: true
    })

    // Em produção isso precisa ser uma variável ambiente
    await fastify.register(jwt,{
        secret: 'nlwcopa'
    })

    // Rotas da API
    await fastify.register(poolRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes)

    // Servidor rodando na porta 3333, o host: 0.0.0.0 é para o mobile poder consumir
    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

bootstrap()