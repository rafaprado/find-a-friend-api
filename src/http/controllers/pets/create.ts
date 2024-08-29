import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { $Enums } from '@prisma/client'
import { enumMapping } from '../utils/enumMapping'
import { PetsPrismaRepository } from '@/repositories/prisma/pets-prisma-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'
import { OrganizationsPrismaRepository } from '@/repositories/prisma/organizations-prisma-repository'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().max(200),
    age: z.number(),
    size: z.enum(enumMapping($Enums.PetSize)),
    energy: z.enum(enumMapping($Enums.PetEnergy)),
    independency: z.enum(enumMapping($Enums.PetIndependency)),
    environment_size: z.enum(enumMapping($Enums.PetEnvironment)),
    cep: z
    .string()
    .trim()
    .regex(/^(\d{5})-?(\d{3})$/),
    adoption_requirements: z.string().optional(),
    organization_id: z.string()
  })

  const data = createPetBodySchema.parse(request.body)
  data.cep = data.cep.replace("-", "");
  
  const petsRepository = new PetsPrismaRepository()
  const organizationRepository = new OrganizationsPrismaRepository()
  const createPetUseCase = new CreatePetUseCase(petsRepository, organizationRepository)

  const pet = await createPetUseCase.execute(data)

  return reply.status(201).send(pet)
}
