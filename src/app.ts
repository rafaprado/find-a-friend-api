import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

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
