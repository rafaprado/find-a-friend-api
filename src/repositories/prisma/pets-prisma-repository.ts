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

  async findManyByCep(cep: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        cep
      },
      skip: (page - 1) * 20,
      take: 20
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
    page: number,
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
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return pets;
  }
}
