import { describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { PetsInMemoryRepository } from '@/repositories/in-memory/pets-in-memory-repository'
import { OrganizationsInMemoryRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { hash } from 'bcryptjs'

describe('Create Pet Use Case', () => {
  it('Should create a pet', async () => {
    const petsRepository = new PetsInMemoryRepository()
    const organizationRepository = new OrganizationsInMemoryRepository()
    const sut = new CreatePetUseCase(petsRepository, organizationRepository)

    const organization = await organizationRepository.create({
      name: 'Doe Org',
      email: 'doe@org.com',
      password_hash: await hash('123456', 6),
      cep: '14770000',
      phone_number: '17999999999',
      address: 'Wolf Street, number 22',
    })

    const { pet } = await sut.execute({
      name: 'Little Pet',
      description: 'He is little puddle, who loves to play',
      age: 1,
      cep: '14770000',
      size: 'SMALL',
      energy: 'HIGH',
      environmentSize: 'MEDIUM',
      independency: 'MEDIUM',
      adoptionRequirements: JSON.stringify([
        'Precisa de um abiente moderado em tamanho',
        'Alergico a lactose',
      ]),
      organizationId: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(
      expect.objectContaining({
        age: 1,
      }),
    )
  })
})
