// routes/investigacaoIrasRoutes.js

import express from 'express';
import {
  createInvestigacaoIras,
  getInvestigacaoIrasByNumeroRegistro,
} from '../controllers/investigacaoIrasController.js';

const router = express.Router();

router.post('/', createInvestigacaoIras);
router.get('/:numeroRegistro', getInvestigacaoIrasByNumeroRegistro);

export default router;
