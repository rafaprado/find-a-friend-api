-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('Pequeno', 'Médio', 'Grande');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('Baixa', 'Moderada', 'Muita energia');

-- CreateEnum
CREATE TYPE "PetIndependency" AS ENUM ('Baixo', 'Médio', 'Alto');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('Ambiente pequeno', 'Ambiente médio', 'Ambiente amplo');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy" "PetEnergy" NOT NULL,
    "independency" "PetIndependency" NOT NULL,
    "environment_size" "PetEnvironment" NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets_pictures" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pets_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- AddForeignKey
ALTER TABLE "pets_pictures" ADD CONSTRAINT "pets_pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
