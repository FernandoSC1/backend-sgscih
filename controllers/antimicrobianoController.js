import Antimicrobiano from '../models/Antimicrobiano.js';

export const createAntimicrobiano = async (req, res) => {
    try {
        const novoAntimicrobiano = new Antimicrobiano(req.body);
        await novoAntimicrobiano.save();
        res.status(201).json(novoAntimicrobiano);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAntimicrobianosByPacienteId = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        // Encontra todos os antimicrobianos para o pacienteId e os ordena pela data de início do tratamento
        const antimicrobianos = await Antimicrobiano.find({ pacienteId }).sort({ inicioTratamento: -1 });
        res.status(200).json(antimicrobianos);
    } catch (error) {
        console.error('Erro ao buscar antimicrobianos por ID do paciente:', error);
        res.status(500).json({ message: error.message });
    }
};

// NOVO: Função para atualizar um antimicrobiano existente
export const updateAntimicrobiano = async (req, res) => {
    try {
        const { id } = req.params; // ID do antimicrobiano a ser atualizado
        const updatedAntimicrobiano = await Antimicrobiano.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedAntimicrobiano) {
            return res.status(404).json({ message: 'Antimicrobiano não encontrado.' });
        }
        res.status(200).json(updatedAntimicrobiano);
    } catch (error) {
        console.error('Erro ao atualizar antimicrobiano:', error);
        res.status(400).json({ message: error.message });
    }
};

// Opcional: deleteAntimicrobiano (exemplo)
export const deleteAntimicrobiano = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAntimicrobiano = await Antimicrobiano.findByIdAndDelete(id);
        if (!deletedAntimicrobiano) {
            return res.status(404).json({ message: 'Antimicrobiano não encontrado.' });
        }
        res.status(200).json({ message: 'Antimicrobiano removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover antimicrobiano:', error);
        res.status(500).json({ message: error.message });
    }
};