import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class OrganizationsInMemoryRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    return organization ?? null
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    return organization ?? null
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone_number: data.phone_number,
      address: data.address,
      cep: data.cep,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
