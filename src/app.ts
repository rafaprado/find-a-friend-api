import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { appRoutes } from './routes/index.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issue: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // LOG ERROR TO AN EXTERNAL TOOL LIKE DATADOG...
  }

  return reply.status(500).send({
    message: 'Internal Server Error.',
  })
})
