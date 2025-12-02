// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'

import {registry} from "./registry.js";

const PORT = 3000;
const fastify = Fastify({
    logger: true
})
await fastify.register(cors, {
    // put your options here
})

const handlers = registry.filter(Boolean);

fastify.get('/handlers', async function handler (request, reply) {
    return handlers.map(h => ({
        name: h.name,
        url: `http://localhost:${PORT}${h.url}`
    }))
})

handlers.forEach((handler) => {
    fastify.post(handler.url, handler.handler)
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
    return reply.redirect("/handlers")
})

// Run the server!
try {
    await fastify.listen({ port: PORT })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}