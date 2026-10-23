export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type PetSpecies = 'dog' | 'cat' | 'other';

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: PetSpecies;
  breed: string;
  birthDate: string;
}

export interface RegisterOwnerInput {
  name?: string;
  email?: string;
  phone?: string;
}

export interface CreatePetInput {
  ownerId?: string;
  name?: string;
  species?: string;
  breed?: string;
  birthDate?: string;
}

export interface UpdatePetInput {
  petId?: string;
  ownerId?: string;
  name?: string;
  species?: string;
  breed?: string;
  birthDate?: string;
}

export interface DeletePetInput {
  petId?: string;
  ownerId?: string;
}
