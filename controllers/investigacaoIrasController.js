// backend/controllers/investigacaoIrasController.js
import InvestigacaoIRAS from '../models/investigacaoIras.js';

// ... (suas funções createInvestigacaoIras e getInvestigacaoIrasByNumeroRegistro existentes) ...

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
      new: true, // Retorna o documento modificado
      runValidators: true, // Roda as validações do schema
    });

    if (!investigacao) {
      return res.status(404).json({ message: 'Formulário de IRAS não encontrado para atualização.' });
    }
    res.status(200).json({ message: 'Formulário de IRAS atualizado com sucesso!', data: investigacao });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o formulário de IRAS.', error: error.message });
  }
};
