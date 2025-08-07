import mongoose from 'mongoose';

const dispositivoSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    cateterVenosoCentral: {
        dataInsercao: { type: Date },
        dataRemocao: { type: Date },
    },
    sondaVesicalDemora: {
        dataInsercao: { type: Date },
        dataRemocao: { type: Date },
    },
    acessoVenosoPeriferico: {
        dataInsercao: { type: Date },
        dataRemocao: { type: Date },
    },
    tuboOroTraqueal: {
        dataInsercao: { type: Date },
        dataRemocao: { type: Date },
    },
}, {
    timestamps: true // <-- ADICIONAR ESTA LINHA
});

export default mongoose.model('Dispositivo', dispositivoSchema);
