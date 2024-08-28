import { organizationRoutes } from '@/http/controllers/organizations/routes'
import { petsRoutes } from '@/http/controllers/pets/routes'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(organizationRoutes, {
    prefix: '/organization',
  })

  app.register(petsRoutes, {
    prefix: '/pet'
  })
}
