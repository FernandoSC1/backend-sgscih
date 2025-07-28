import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    // NOVO CAMPO: numeroZeroDia
    numeroZeroDia: {
        type: String,
        required: true,
        unique: true, // Garante que cada numeroZeroDia seja único
        trim: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    dataAdmissao: {
        type: Date,
        required: true
    },
    dataAlta: { // Campo opcional para registrar a data de alta
        type: Date,
        default: null // Valor padrão é null
    },
    leito: {
        type: String,
        required: true,
        trim: true
    },
    setor: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;