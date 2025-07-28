import express from 'express';
import {
    createPaciente,
    getAllPacientes,
    getPacienteById,
    getPacienteByNumeroZeroDia, // NOVO: Importe o novo controlador updatePaciente
    getRelatorioTransferencia,
    updatePaciente,
    getTransferenciaReport,
} from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/', createPaciente);
router.get('/', getAllPacientes);
router.get('/:id', getPacienteById);
router.put('/:id', updatePaciente);

// Rotas de Relatórios
router.get('/numeroZeroDia/:numeroZeroDia', getPacienteByNumeroZeroDia);
router.get('/relatorios/transferencia/numeroZeroDia/:numeroZeroDia', getRelatorioTransferencia);
router.get('/relatorios/transferencia/:pacienteId', getTransferenciaReport);

export default router;
