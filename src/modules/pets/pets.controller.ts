import { Request, Response } from 'express';
import { CreatePetInput, DeletePetInput, RegisterOwnerInput, UpdatePetInput } from './pets.models';
import * as petsService from './pets.service';

export function registerOwner(req: Request, res: Response): void {
  const result = petsService.registerOwner(req.body as RegisterOwnerInput | undefined);
  res.status(result.status).json(result.body);
}

export function createPet(req: Request, res: Response): void {
  const result = petsService.createPet(req.body as CreatePetInput | undefined);
  res.status(result.status).json(result.body);
}

export function listPets(req: Request, res: Response): void {
  const ownerId = typeof req.query.ownerId === 'string' ? req.query.ownerId : undefined;
  res.json(petsService.listPets(ownerId));
}

export function updatePet(req: Request, res: Response): void {
  const result = petsService.updatePet(req.body as UpdatePetInput | undefined);
  res.status(result.status).json(result.body);
}

export function deletePet(req: Request, res: Response): void {
  const result = petsService.deletePet(req.body as DeletePetInput | undefined);
  res.status(result.status).json(result.body);
}
