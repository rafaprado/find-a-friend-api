import { PetsRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: number
  size: $Enums.PetSize
  energy: $Enums.PetEnergy
  independency: $Enums.PetIndependency
  environmentSize: $Enums.PetEnvironment
  adoptionRequirements: string | null
  cep: string
  organizationId: string
}

interface CreatePetUseCaseReply {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: CreatePetUseCaseRequest): Promise<CreatePetUseCaseReply> {
    const pet = await this.petsRepository.create({
      name: data.name,
      description: data.description,
      age: data.age,
      cep: data.cep,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment_size: data.environmentSize,
      adoption_requirements: data.adoptionRequirements,
      organization_id: data.organizationId,
    })

    return { pet }
  }
}
