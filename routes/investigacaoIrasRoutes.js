// backend/routes/investigacaoIrasRoutes.js
import express from 'express';
import {
  createInvestigacaoIras,
  getInvestigacaoIrasByNumeroRegistro,
  getInvestigacaoIrasById,
  updateInvestigacaoIras,
} from '../controllers/investigacaoIrasController.js';

const router = express.Router();

router.post('/', createInvestigacaoIras);
router.get('/:numeroRegistro', getInvestigacaoIrasByNumeroRegistro);
router.get('/id/:id', getInvestigacaoIrasById);
router.put('/:id', updateInvestigacaoIras);

export default router;
