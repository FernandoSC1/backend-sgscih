// backend/routes/dispositivoRoutes.js
import express from 'express';
import {
    createDispositivo,
    getDispositivosByPacienteId, // Este nome precisa corresponder EXATAMENTE ao que é exportado
    updateDispositivo,
    deleteDispositivo // Se estiver usando
} from '../controllers/dispositivoController.js';

const router = express.Router();

router.post('/', createDispositivo);
router.get('/paciente/:pacienteId', getDispositivosByPacienteId);
router.put('/:id', updateDispositivo);
router.delete('/:id', deleteDispositivo);

export default router;