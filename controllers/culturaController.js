import Cultura from '../models/Cultura.js';

export const createCultura = async (req, res) => {
    try {
        const novaCultura = new Cultura(req.body);
        await novaCultura.save();
        res.status(201).json(novaCultura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCulturasByPacienteId = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const culturas = await Cultura.find({ pacienteId }).sort({ dataColeta: -1 }); // Ajuste a ordenação se necessário
        res.status(200).json(culturas);
    } catch (error) {
        console.error('Erro ao buscar culturas por ID do paciente:', error);
        res.status(500).json({ message: error.message });
    }
};


// NOVO: Função para atualizar uma cultura existente
export const updateCultura = async (req, res) => {
    try {
        const { id } = req.params; // ID da cultura a ser atualizada
        const updatedCultura = await Cultura.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedCultura) {
            return res.status(404).json({ message: 'Cultura não encontrada.' });
        }
        res.status(200).json(updatedCultura);
    } catch (error) {
        console.error('Erro ao atualizar cultura:', error);
        res.status(400).json({ message: error.message });
    }
};

// Opcional: deleteCultura (exemplo)
export const deleteCultura = async (req, res) => {
   try {
       const { id } = req.params;
      const deletedCultura = await Cultura.findByIdAndDelete(id);
       if (!deletedCultura) {
            return res.status(404).json({ message: 'Cultura não encontrada.' });
       }
       res.status(200).json({ message: 'Cultura removida com sucesso.' });
    } catch (error) {
       console.error('Erro ao remover cultura:', error);
       res.status(500).json({ message: error.message });
    }
};

export const getHistoricoCulturasByPaciente = async (req, res) => {
    try {
        const culturas = await Cultura.find({ pacienteId: req.params.pacienteId }).sort({ dataColeta: 1 });
        res.json(culturas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};