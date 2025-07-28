import mongoose from 'mongoose';

const culturaSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    tipoCultura: { type: String, required: true, enum: ['hemocultura', 'urocultura', 'culturaSecrecaoTraqueal', 'culturaPontaCateter', 'culturaSwabNasal', 'culturaSwabAxilar', 'culturaSwabRetal'] },
    dataColeta: { type: Date, required: true },
    dataResultado: { type: Date },
    resultado: { type: String },
});

export default mongoose.model('Cultura', culturaSchema);
