import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query'],
})

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

    // http://localhost:3333/pools/count
    fastify.get('/pools/count', async () => {

        // conta quantos dados existem na tabela 'pool' -> númeor de bolões criados
        const count = await prisma.pool.count()

        return { count }
    })

    // Servidor rodando na porta 3333, o host: 0.0.0.0 é para o mobile poder consumir
    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()