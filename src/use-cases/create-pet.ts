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
  environment_size: $Enums.PetEnvironment
  adoption_requirements?: string
  cep: string
  organization_id: string
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
      data.organization_id,
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
      environment_size: data.environment_size,
      adoption_requirements: data.adoption_requirements,
      organization_id: data.organization_id,
    })

    return { pet }
  }
}
