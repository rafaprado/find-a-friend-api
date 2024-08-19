import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetInfoUseCaseRequest {
  id: string
}

interface GetPetInfoUseCaseReply {
  pet: Pet | null
}

export class GetPetInfoUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseReply> {
    const pet = await this.petsRepository.findById(id)

    return { pet }
  }
}
