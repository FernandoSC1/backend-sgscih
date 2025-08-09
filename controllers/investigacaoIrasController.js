// backend/controllers/investigacaoIrasController.js
import InvestigacaoIRAS from '../models/investigacaoIras.js';

// @desc Cria um novo formulário de investigação de IRAS
// @route POST /api/investigacao-iras
// @access Public
export const createInvestigacaoIras = async (req, res) => {
  try {
    const novaInvestigacao = new InvestigacaoIRAS(req.body);
    await novaInvestigacao.save();
    res.status(201).json({ message: 'Formulário de IRAS salvo com sucesso!', data: novaInvestigacao });
  } catch (error) {
    if (error.code === 11000) { // Erro de duplicidade
      return res.status(400).json({ message: 'Já existe um formulário para este número de registro.' });
    }
    res.status(500).json({ message: 'Erro ao salvar o formulário de IRAS.', error: error.message });
  }
};

// @desc Obtém um formulário de IRAS por numeroRegistro
// @route GET /api/investigacao-iras/:numeroRegistro
// @access Public
export const getInvestigacaoIrasByNumeroRegistro = async (req, res) => {
  try {
    const investigacao = await InvestigacaoIRAS.findOne({ numeroRegistro: req.params.numeroRegistro });
    if (!investigacao) {
      return res.status(404).json({ message: 'Formulário de IRAS não encontrado para este paciente.' });
    }
    res.status(200).json(investigacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar formulário de IRAS.', error: error.message });
  }
};

// @desc    Obtém um formulário de IRAS por ID do documento
// @route   GET /api/investigacao-iras/id/:id
// @access  Public
export const getInvestigacaoIrasById = async (req, res) => {
  try {
    const investigacao = await InvestigacaoIRAS.findById(req.params.id);
    if (!investigacao) {
      return res.status(404).json({ message: 'Formulário de IRAS não encontrado.' });
    }
    res.status(200).json(investigacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar formulário de IRAS.', error: error.message });
  }
};

// @desc    Atualiza um formulário de IRAS por ID
// @route   PUT /api/investigacao-iras/:id
// @access  Public
export const updateInvestigacaoIras = async (req, res) => {
  try {
    const investigacao = await InvestigacaoIRAS.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!investigacao) {
      return res.status(404).json({ message: 'Formulário de IRAS não encontrado para atualização.' });
    }
    res.status(200).json({ message: 'Formulário de IRAS atualizado com sucesso!', data: investigacao });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o formulário de IRAS.', error: error.message });
  }
};
