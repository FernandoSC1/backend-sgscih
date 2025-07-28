import Dispositivo from '../models/Dispositivo.js';

export const createDispositivo = async (req, res) => {
    try {
        const novoDispositivo = new Dispositivo(req.body);
        await novoDispositivo.save();
        res.status(201).json(novoDispositivo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDispositivosByPacienteId = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const dispositivos = await Dispositivo.find({ pacienteId }).sort({ createdAt: -1 });
        res.status(200).json(dispositivos);
    } catch (error) {
        console.error('Erro ao buscar dispositivos por ID do paciente:', error);
        res.status(500).json({ message: error.message });
    }
};

// NOVO: Função para atualizar um dispositivo existente
export const updateDispositivo = async (req, res) => {
    try {
        const { id } = req.params; // ID do dispositivo a ser atualizado
        const updatedDispositivo = await Dispositivo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedDispositivo) {
            return res.status(404).json({ message: 'Dispositivo não encontrado.' });
        }
        res.status(200).json(updatedDispositivo);
    } catch (error) {
        console.error('Erro ao atualizar dispositivo:', error);
        res.status(400).json({ message: error.message });
    }
};

// Opcional: deleteDispositivo (exemplo)
 export const deleteDispositivo = async (req, res) => {
     try {
         const { id } = req.params;
         const deletedDispositivo = await Dispositivo.findByIdAndDelete(id);
         if (!deletedDispositivo) {
             return res.status(404).json({ message: 'Dispositivo não encontrado.' });
         }
         res.status(200).json({ message: 'Dispositivo removido com sucesso.' });
    } catch (error) {
         console.error('Erro ao remover dispositivo:', error);
        res.status(500).json({ message: error.message });
    }
};
