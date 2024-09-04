import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchByCity } from './fetch-by-city'
import { details } from './details'
import { fetchByFeatures } from './fetch-by-features'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.get('/:cep', fetchByFeatures)
  app.get("/city/:cep", fetchByCity)
  app.get("/details/:id", details)
}
