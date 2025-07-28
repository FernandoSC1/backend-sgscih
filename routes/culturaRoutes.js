// backend/routes/culturaRoutes.js
import express from 'express';
import {
    createCultura,
    getCulturasByPacienteId,
    updateCultura, // NOVO: Importar a função de atualização
    deleteCultura // Opcional
} from '../controllers/culturaController.js';

const router = express.Router();

router.post('/', createCultura);
router.get('/paciente/:pacienteId', getCulturasByPacienteId);
router.put('/:id', updateCultura); // NOVO: Rota para atualizar cultura por ID
router.delete('/:id', deleteCultura); // Opcional

export default router;