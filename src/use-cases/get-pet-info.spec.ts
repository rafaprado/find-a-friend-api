import { describe, expect, it } from 'vitest'
import { GetPetInfoUseCase } from './get-pet-info'
import { PetsInMemoryRepository } from '@/repositories/in-memory/pets-in-memory-repository'
import { OrganizationsInMemoryRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { hash } from 'bcryptjs'

describe('Get Pet Info Use Case', () => {
  it('Should get all information about an specific pet', async () => {
    const petsRepository = new PetsInMemoryRepository()
    const organizationRepository = new OrganizationsInMemoryRepository()
    const sut = new GetPetInfoUseCase(petsRepository)

    const organization = await organizationRepository.create({
      name: 'Doe Org',
      email: 'doe@org.com',
      password_hash: await hash('123456', 6),
      cep: '14770000',
      phone_number: '17999999999',
      address: 'Wolf Street, number 22',
    })

    const createdPet = await petsRepository.create({
      name: 'Little Pet',
      description: 'He is little puddle, who loves to play',
      age: 1,
      cep: '14770000',
      size: 'SMALL',
      energy: 'HIGH',
      environment_size: 'MEDIUM',
      independency: 'MEDIUM',
      organization_id: organization.id,
    })

    const { pet } = await sut.execute({ id: createdPet.id })

    const petData = {
      ...pet,
      organization_name: organization.name,
      organization_phone: organization.phone_number,
      address: organization.address,
    }

    expect(petData).toEqual(
      expect.objectContaining({
        name: 'Little Pet',
        organization_name: 'Doe Org',
      }),
    )
  })
})
