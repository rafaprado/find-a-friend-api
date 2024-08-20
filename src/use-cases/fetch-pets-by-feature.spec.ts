import { describe, expect, it } from 'vitest'
import { FetchPetsByFeatureUseCase } from './fetch-pets-by-feature'
import { PetsInMemoryRepository } from '@/repositories/in-memory/pets-in-memory-repository'

describe('Fetch Pets by Feature Use Case', () => {
  it('Should fetch all pets by the given verbs', async () => {
    const petsRepository = new PetsInMemoryRepository()
    const sut = new FetchPetsByFeatureUseCase(petsRepository)

    await petsRepository.create({
      name: 'Little Pet',
      description: 'He is little puddle, who loves to play',
      age: 1,
      cep: '14770000',
      size: 'SMALL',
      energy: 'HIGH',
      environment_size: 'MEDIUM',
      independency: 'MEDIUM',
      adoption_requirements: JSON.stringify([
        'Precisa de um abiente moderado em tamanho',
        'Alergico a lactose',
      ]),
      organization_id: 'some-id',
    })

    await petsRepository.create({
      name: 'Huge Pet',
      description: 'He is little puddle, who loves to play',
      age: 1,
      cep: '14770000',
      size: 'LARGE',
      energy: 'HIGH',
      environment_size: 'MEDIUM',
      independency: 'MEDIUM',
      adoption_requirements: JSON.stringify([
        'Precisa de um abiente moderado em tamanho',
        'Alergico a lactose',
      ]),
      organization_id: 'some-id',
    })

    const { pets } = await sut.execute({
      cep: '14770000',
      size: 'LARGE',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        size: 'LARGE',
      }),
    )
  })
})
