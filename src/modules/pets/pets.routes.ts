import { Router } from 'express';
import * as petsController from './pets.controller';

const router = Router();

router.post('/turnos-veterinaria/pets/register-owner', petsController.registerOwner);
router.post('/turnos-veterinaria/pets/create', petsController.createPet);
router.get('/turnos-veterinaria/pets/list', petsController.listPets);
router.put('/turnos-veterinaria/pets/update', petsController.updatePet);
router.delete('/turnos-veterinaria/pets/delete', petsController.deletePet);

export default router;
