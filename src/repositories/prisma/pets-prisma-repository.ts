import { Prisma, Pet, $Enums } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PetsPrismaRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }

  async findManyByCep(cep: string) {
    const pets = await prisma.pet.findMany({
      where: {
        cep
      }
    })

    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id
      }
    });

    return pet;
  }

  async findManyByFeatures(
    cep: string,
    size?: $Enums.PetSize,
    energy?: $Enums.PetEnergy,
    independency?: $Enums.PetIndependency,
    environment_size?: $Enums.PetEnvironment,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        cep,
        size,
        energy,
        independency,
        environment_size
      }
    })

    return pets;
  }
}
