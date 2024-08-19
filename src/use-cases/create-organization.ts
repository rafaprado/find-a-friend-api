import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

interface CreateOrganizationUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: string
  phone_number: string
}

interface CreateOrganizationUseCaseReply {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    cep,
    phone_number,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseReply> {
    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new EmailAlreadyInUseError()
    }

    const hashedPassword = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      name,
      email,
      password_hash: hashedPassword,
      address,
      cep,
      phone_number,
    })

    return { organization }
  }
}
