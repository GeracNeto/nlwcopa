import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

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

    // Mostra o número de bolões
    fastify.get('/pools/count', async () => {

        // conta quantos dados existem na tabela 'pool' -> númeor de bolões criados
        const count = await prisma.pool.count()

        return { count }
    })

    // Conta os usuários
    fastify.get('/users/count', async () => {

        // conta quantos dados existem na tabela 'pool' -> númeor de bolões criados
        const count = await prisma.user.count()

        return { count }
    })

    //
    fastify.get('/guesses/count', async () => {

        // conta quantos dados existem na tabela 'pool' -> númeor de bolões criados
        const count = await prisma.guess.count()

        return { count }
    })

    // Criar bolão
    fastify.post('/pools', async (request, reply) => {

        // Uso da lib zod
        const createPoolBody = z.object({
            title: z.string()
        })

        const { title } = createPoolBody.parse(request.body)

        // Gera um código de 6 caracteres
        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase() // Deixa o código em caixa alta

        await prisma.pool.create({
            data: {
                title,
                code
            }
        })

        return reply.status(201).send({ code })
    })

    // Servidor rodando na porta 3333, o host: 0.0.0.0 é para o mobile poder consumir
    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

bootstrap()