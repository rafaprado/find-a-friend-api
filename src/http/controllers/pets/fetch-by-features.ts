import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { enumMapping } from "../utils/enumMapping";
import { $Enums } from "@prisma/client";
import { PetsPrismaRepository } from "@/repositories/prisma/pets-prisma-repository";
import { FetchPetsByFeatureUseCase } from "@/use-cases/fetch-pets-by-feature";

export async function fetchByFeatures(request: FastifyRequest, reply: FastifyReply) {
  const fetchByFeaturesParamsSchema = z.object({
    cep: z.string()
    .trim()
    .regex(/^(\d{5})-?(\d{3})$/),
  });

  const fetchByFeaturesQuerySchema = z.object({
    s: z.enum(enumMapping($Enums.PetSize)).optional(),
    e: z.enum(enumMapping($Enums.PetEnergy)).optional(),
    i: z.enum(enumMapping($Enums.PetIndependency)).optional(),
    env: z.enum(enumMapping($Enums.PetEnvironment)).optional(),
    pg: z.coerce.number()
  });

  const { cep } = fetchByFeaturesParamsSchema.parse(request.params);
  const { s: size, e: energy, i: independency, env: environment, pg: page } = fetchByFeaturesQuerySchema.parse(request.query);

  const petsRepository = new PetsPrismaRepository()
  const fetchPetsByFeatureUseCase = new FetchPetsByFeatureUseCase(petsRepository);

  const { pets } = await fetchPetsByFeatureUseCase.execute({size, page, energy, independency, environment_size: environment, cep})

  return pets
}