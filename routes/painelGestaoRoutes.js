// backend/routes/painelGestaoRoutes.js
import express from 'express';
import {
    getAtualizacoesDiarias,
    getUsoAntimicrobianos,
    getInvestigacoesAtivas
} from '../controllers/painelGestaoController.js';

const router = express.Router();

// Rota para a primeira tela do painel
router.get('/atualizacoes', getAtualizacoesDiarias);

// Rota para a segunda tela do painel
router.get('/uso-antimicrobianos', getUsoAntimicrobianos);

// Rota para a terceira tela do painel
router.get('/investigacoes', getInvestigacoesAtivas);

export default router;
