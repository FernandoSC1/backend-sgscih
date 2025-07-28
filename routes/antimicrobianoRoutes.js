// backend/routes/antimicrobianoRoutes.js
import express from 'express';
import {
    createAntimicrobiano,
    getAntimicrobianosByPacienteId,
    updateAntimicrobiano, // NOVO: Importar a função de atualização
    deleteAntimicrobiano // Opcional
} from '../controllers/antimicrobianoController.js';

const router = express.Router();

router.post('/', createAntimicrobiano);
router.get('/paciente/:pacienteId', getAntimicrobianosByPacienteId);
router.put('/:id', updateAntimicrobiano); // NOVO: Rota para atualizar antimicrobiano por ID
router.delete('/:id', deleteAntimicrobiano); // Opcional

export default router;