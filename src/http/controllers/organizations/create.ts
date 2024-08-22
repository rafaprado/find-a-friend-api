import { OrganizationsPrismaRepository } from '@/repositories/prisma/organizations-prisma-repository'
import { CreateOrganizationUseCase } from '@/use-cases/create-organization'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    cep: z
      .string()
      .trim()
      .regex(/^(\d{5})-?(\d{3})$/),
    phone_number: z
      .string()
      .trim()
      .regex(/^(\(?\d{2}\)?)\s?(\d{5})-?(\d{4})$/),
  })

  const { name, email, password, address, cep, phone_number } =
    createOrganizationBodySchema.parse(request.body)

  const organizationsRepository = new OrganizationsPrismaRepository()
  const createOrganizationuseCase = new CreateOrganizationUseCase(
    organizationsRepository,
  )

  const organization = await createOrganizationuseCase.execute({
    name,
    email,
    password,
    address,
    cep: cep.replace('-', ''),
    phone_number: phone_number.replace(/(\()|(\))|(-)/g, ''),
  })

  return reply.status(201).send({ organization })
}
