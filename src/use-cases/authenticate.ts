import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseReply {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseReply> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
