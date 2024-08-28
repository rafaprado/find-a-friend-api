import { PetsInMemoryRepository } from '@/repositories/in-memory/pets-in-memory-repository'
import { describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

describe('Fetch Pets By City Use Case', () => {
  it('Should fetch all pets from a given city', async () => {
    const petsRepository = new PetsInMemoryRepository()
    const sut = new FetchPetsByCityUseCase(petsRepository)

    await petsRepository.create({
      name: 'Little Pet',
      description: 'He is little puddle, who loves to play',
      age: 1,
      cep: '14770000',
      size: 'SMALL',
      energy: 'HIGH',
      environment_size: 'MEDIUM',
      independency: 'MEDIUM',
      organization_id: 'ogan-123',
    })

    await petsRepository.create({
      name: 'Node Dog',
      description: 'He is Huge and lazy',
      age: 1,
      cep: '14770000',
      size: 'LARGE',
      energy: 'MEDIUM',
      environment_size: 'LARGE',
      independency: 'HIGH',
      organization_id: 'organ-321',
    })

    const { pets } = await sut.execute({ cep: '14770000', page: 0 })

    expect(pets).toHaveLength(2)
  })
})
