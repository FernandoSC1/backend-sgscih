// backend/routes/investigacaoIrasRoutes.js
import express from 'express';
import {
  createInvestigacaoIras,
  getInvestigacaoIrasByNumeroRegistro,
} from '../controllers/investigacaoIrasController.js'; // Garante que o nome do controller está correto

const router = express.Router();

router.post('/', createInvestigacaoIras);
router.get('/:numeroRegistro', getInvestigacaoIrasByNumeroRegistro);

export default router;
