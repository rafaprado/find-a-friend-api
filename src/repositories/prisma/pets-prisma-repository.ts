import { Prisma, Pet, $Enums } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PetsPrismaRepository implements PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput) {}

  findManyByCep(cep: string): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.')
  }

  findManyByFeatures(
    cep: string,
    size?: $Enums.PetSize,
    energy?: $Enums.PetEnergy,
    independency?: $Enums.PetIndependency,
    environment_size?: $Enums.PetEnvironment,
  ): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }
}
