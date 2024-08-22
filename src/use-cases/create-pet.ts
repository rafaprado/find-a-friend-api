import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'
import { InvalidParametersError } from './errors/invalid-parameters-error'

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
  constructor(
    private petsRepository: PetsRepository,
    private organizationRepository: OrganizationsRepository,
  ) {}

  async execute(data: CreatePetUseCaseRequest): Promise<CreatePetUseCaseReply> {
    const organization = await this.organizationRepository.findById(
      data.organizationId,
    )

    if (!organization) {
      throw new InvalidParametersError()
    }

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
