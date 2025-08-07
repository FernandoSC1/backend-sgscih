// models/Antimicrobiano.js
import mongoose from 'mongoose';

const antimicrobianoSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    nomeMedicamento: { type: String, required: true },
    inicioTratamento: { type: Date, required: true },
    fimTratamento: { type: Date },
    houveTroca: { type: Boolean, default: false },
    prorrogacaoPrescricao: { type: Boolean, default: false },
}, {
    timestamps: true // <-- ADICIONAR ESTA LINHA
});

export default mongoose.model('Antimicrobiano', antimicrobianoSchema);