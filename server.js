import {fastify} from 'fastify'
// import {DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify() 

// metodos 
// GET = usado para buscar alguma operação: listagem
// POST = criação
// PUT = alteração 
// DELETE = deletar
// PATCH = deletar algo especifico

//criando nosos banco de dados
const database = new DatabasePostgres()


// Request body = toda vez que eu utilizo o metodo post e put eu posso usar um corpo para a requisição

// POST http//localhost:3333 
server.post('/videos',async (request,reply) =>{

    const {title, description, duration} = request.body


    await database.create({
        title,
        description,
        duration,
    })
    return reply.status(201).send()
    //o http status 201 significa que algo foi criado
})

server.get('/videos', async (request) =>{
    const search = request.query.search

    const videos = await database.list(search)
    
    return videos
})

// route parameter
server.put('/videos/:id', async (request, reply) =>{
    const videoid = request.params.id
    const {title, description, duration} = request.body

        await database.update(videoid,{
        title,
        description,
        duration,
    })


    //retornando resposta vazia
    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) =>{
    const videoId = request.params.id

    database.delet(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})
