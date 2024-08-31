import { PetsPrismaRepository } from "@/repositories/prisma/pets-prisma-repository";
import { GetPetInfoUseCase } from "@/use-cases/get-pet-info";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsBodySchema = z.object({
    id: z.string().uuid()
  })

  const { id } = detailsParamsBodySchema.parse(request.params)

  const petsRepository = new PetsPrismaRepository();
  const getPetInfoUseCase = new GetPetInfoUseCase(petsRepository);

  const { pet } = await getPetInfoUseCase.execute({id});

  return pet;
}