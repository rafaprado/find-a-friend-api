import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { OrganizationsInMemoryRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationRepository: OrganizationsInMemoryRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new OrganizationsInMemoryRepository()
    authenticateUseCase = new AuthenticateUseCase(organizationRepository)
  })

  it('Should be able to authenticate', async () => {
    organizationRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
      cep: '14444444',
      address: 'Wolf Street, number 127',
      phone_number: '17999999999',
    })

    const { organization } = await authenticateUseCase.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with an inexistent e-mail', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with a wrong password', async () => {
    organizationRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
      cep: '14444444',
      address: 'Wolf Street, number 127',
      phone_number: '17999999999',
    })

    await expect(
      authenticateUseCase.execute({
        email: 'john@doe.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
