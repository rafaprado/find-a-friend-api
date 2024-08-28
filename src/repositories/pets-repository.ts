import { $Enums, Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCep(cep: string, page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  findManyByFeatures(
    cep: string,
    size?: $Enums.PetSize,
    energy?: $Enums.PetEnergy,
    independency?: $Enums.PetIndependency,
    environment_size?: $Enums.PetEnvironment,
  ): Promise<Pet[]>
}
