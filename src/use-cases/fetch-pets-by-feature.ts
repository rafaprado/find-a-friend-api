import { PetsRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'

interface FetchPetsByFeatureUseCaseRequest {
  cep: string
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
    energy,
    independency,
    environment_size,
    cep,
  }: FetchPetsByFeatureUseCaseRequest): Promise<FetchPetsByFeatureUseCaseReply> {
    const pets = await this.petsRepository.findManyByFeatures(
      size,
      energy,
      independency,
      environment_size,
      cep,
    )

    return pets
  }
}
