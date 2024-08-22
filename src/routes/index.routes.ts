import { organizationRoutes } from '@/http/controllers/organizations/routes'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(organizationRoutes, {
    prefix: '/organization',
  })
}
