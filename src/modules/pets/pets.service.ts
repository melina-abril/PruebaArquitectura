import { CreatePetInput, DeletePetInput, Owner, Pet, PetSpecies, RegisterOwnerInput, UpdatePetInput } from './pets.models';

const owner: Owner = {
  id: 'owner-001',
  name: 'María González',
  email: 'maria@example.com',
  phone: '+54 11 5555 0101'
};

const pets: Pet[] = [
  { id: 'pet-001', ownerId: owner.id, name: 'Luna', species: 'dog', breed: 'Mestiza', birthDate: '2020-05-12' },
  { id: 'pet-002', ownerId: owner.id, name: 'Milo', species: 'cat', breed: 'Común europeo', birthDate: '2022-09-03' }
];

const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const isSpecies = (value: unknown): value is PetSpecies => value === 'dog' || value === 'cat' || value === 'other';

// Respuestas dummy basadas en ejemplos fijos; reemplazar por persistencia real.
export function registerOwner(input: RegisterOwnerInput = {}) {
  if (!hasText(input.name) || !hasText(input.email) || !hasText(input.phone)) {
    return { status: 400, body: { error: 'Name, email and phone are required.' } };
  }
  return { status: 201, body: { owner } };
}

export function createPet(input: CreatePetInput = {}) {
  if (!hasText(input.name) || !hasText(input.breed) || !hasText(input.birthDate) || !isSpecies(input.species)) {
    return { status: 400, body: { error: 'Name, species (dog, cat or other), breed and birthDate are required.' } };
  }
  if (input.ownerId !== owner.id) {
    return { status: 404, body: { error: 'Owner not found.' } };
  }
  return {
    status: 201,
    body: { pet: { id: 'pet-003', ownerId: owner.id, name: 'Nina', species: 'cat' as PetSpecies, breed: 'Siamesa', birthDate: '2023-01-15' } }
  };
}

export function listPets(ownerId: string | undefined) {
  return { pets: ownerId === owner.id ? pets : [] };
}

export function updatePet(input: UpdatePetInput = {}) {
  const pet = pets.find((item) => item.id === input.petId && item.ownerId === input.ownerId);
  if (!pet) {
    return { status: 404, body: { error: 'Pet not found.' } };
  }
  if (input.species !== undefined && !isSpecies(input.species)) {
    return { status: 400, body: { error: 'Species must be dog, cat or other.' } };
  }
  return {
    status: 200,
    body: {
      pet: {
        ...pet,
        name: hasText(input.name) ? input.name : pet.name,
        species: input.species ?? pet.species,
        breed: hasText(input.breed) ? input.breed : pet.breed,
        birthDate: hasText(input.birthDate) ? input.birthDate : pet.birthDate
      }
    }
  };
}

export function deletePet(input: DeletePetInput = {}) {
  const pet = pets.find((item) => item.id === input.petId && item.ownerId === input.ownerId);
  if (!pet) {
    return { status: 404, body: { error: 'Pet not found.' } };
  }
  // En el ejemplo, Milo tiene un turno futuro. Reemplazar por una consulta real de turnos.
  if (pet.id === 'pet-002') {
    return { status: 409, body: { error: 'Pet has future appointments and cannot be deleted.' } };
  }
  return { status: 200, body: { petId: pet.id, deleted: true } };
}
