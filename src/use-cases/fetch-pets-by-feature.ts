import { PetsRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'

interface FetchPetsByFeatureUseCaseRequest {
  cep: string
  page: number
  size?: $Enums.PetSize
  energy?: $Enums.PetEnergy
  independency?: $Enums.PetIndependency
  environment_size?: $Enums.PetEnvironment
}

interface FetchPetsByFeatureUseCaseReply {
  pets: Pet[]
}

export class FetchPetsByFeatureUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    size,
    page,
    energy,
    independency,
    environment_size,
    cep,
  }: FetchPetsByFeatureUseCaseRequest): Promise<FetchPetsByFeatureUseCaseReply> {
    const pets = await this.petsRepository.findManyByFeatures(
      cep,
      page,
      size,
      energy,
      independency,
      environment_size,
    )

    return { pets }
  }
}
