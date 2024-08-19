import { describe, expect, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationsInMemoryRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { compare } from 'bcryptjs'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

let organizationRepository: OrganizationsInMemoryRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new OrganizationsInMemoryRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('Should be able to create an organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Dogs',
      email: 'john@dogs.com',
      password: '123456',
      address: 'Example street; number 000',
      cep: '14770-000',
      phone_number: '17999999999',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it("Should be hashing organization's password", async () => {
    const { organization } = await sut.execute({
      name: 'John Dogs',
      email: 'john@dogs.com',
      password: '123456',
      address: 'Example street; number 000',
      cep: '14770-000',
      phone_number: '17999999999',
    })

    const passwordComparison = await compare(
      '123456',
      organization.password_hash,
    )

    expect(passwordComparison).toBe(true)
  })

  it('Should not create an organization with an email already in use', async () => {
    await sut.execute({
      name: 'John Dogs',
      email: 'john@dogs.com',
      password: '123456',
      address: 'Example street; number 000',
      cep: '14770-000',
      phone_number: '17999999999',
    })

    await expect(
      sut.execute({
        name: 'John Dogs',
        email: 'john@dogs.com',
        password: '123456',
        address: 'Example street; number 000',
        cep: '14770-000',
        phone_number: '17999999999',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError)
  })
})
