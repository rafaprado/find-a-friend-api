import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/authenticate', authenticate)
  app.post('/create', create)
}
