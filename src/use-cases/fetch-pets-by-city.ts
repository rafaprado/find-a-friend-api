import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsByCityUseCaseRequest {
  cep: string
  page: number
}

interface FetchPetsByCityUseCaseReply {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cep,
    page
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseReply> {
    const pets = await this.petsRepository.findManyByCep(cep, page)

    return { pets }
  }
}
