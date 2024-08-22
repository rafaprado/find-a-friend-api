import { OrganizationsPrismaRepository } from '@/repositories/prisma/organizations-prisma-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const organizationsRepository = new OrganizationsPrismaRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return { token }
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }

    throw error
  }
}
