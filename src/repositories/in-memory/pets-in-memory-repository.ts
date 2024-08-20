import { $Enums, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class PetsInMemoryRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID().toString(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment_size: data.environment_size,
      cep: data.cep,
      adoption_requirements: data.adoption_requirements ?? null,
      created_at: new Date(),
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }

  async findManyByCep(cep: string) {
    const pets = this.items.filter((item) => item.cep === cep)
    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    return pet ?? null
  }

  async findManyByFeatures(
    cep: string,
    size?: $Enums.PetSize,
    energy?: $Enums.PetEnergy,
    independency?: $Enums.PetIndependency,
    environment_size?: $Enums.PetEnvironment,
  ) {
    const pets = this.items.filter(
      (item) =>
        item.size === size ||
        item.energy === energy ||
        item.independency === independency ||
        item.environment_size === environment_size,
    )

    return pets.filter((item) => item.cep === cep)
  }
}
