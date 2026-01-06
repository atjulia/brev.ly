import { fastify } from 'fastify'
// import { appRoutes } from './routes/app-routes.js'
import { fastifyCors } from '@fastify/cors'

const server = fastify()

server.register(fastifyCors, {
  origin: '*',
})

// server.register(appRoutes)

server
  .listen({
    port: 3333,
    host: '0.0.0.0'
    }).then(() => {
        console.log('HTTP server running')
    })