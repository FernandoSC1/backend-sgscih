// backend/routes/investigacaoIrasRoutes.js
import express from 'express';
import {
  createInvestigacaoIras,
  getInvestigacaoIrasByNumeroRegistro,
  getInvestigacaoIrasById, // NOVO
  updateInvestigacaoIras, // NOVO
} from '../controllers/investigacaoIrasController.js';

const router = express.Router();

router.post('/', createInvestigacaoIras);
router.get('/:numeroRegistro', getInvestigacaoIrasByNumeroRegistro);
router.get('/id/:id', getInvestigacaoIrasById); // NOVO: Rota para buscar por ID
router.put('/:id', updateInvestigacaoIras); // NOVO: Rota para atualizar por ID

export default router;
