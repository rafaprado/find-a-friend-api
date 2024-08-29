import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchByCity } from './fetch-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.get("/city/:cep", fetchByCity)
}
