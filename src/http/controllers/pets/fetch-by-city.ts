import { PetsPrismaRepository } from "@/repositories/prisma/pets-prisma-repository";
import { FetchPetsByCityUseCase } from "@/use-cases/fetch-pets-by-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchByCity(request: FastifyRequest, reply: FastifyReply) {
  const fetchByCityParamsSchema = z.object({
    cep: z.string().trim().regex(/^(\d{5})-?(\d{3})$/)
  })

  const fetchByCityQuerySchema = z.object({
    page: z.coerce.number().min(1)
  })

  const { cep } = fetchByCityParamsSchema.parse(request.params);
  const { page } = fetchByCityQuerySchema.parse(request.query);

  const petsRepository = new PetsPrismaRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository);

  const {pets} = await fetchPetsByCityUseCase.execute({cep, page});

  return reply.status(200).send({pets})
}