import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    numeroZeroDia: {
        type: String,
        required: true,
        unique: true,
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
    dataAlta: {
        type: Date,
        default: null
    },
    leito: {
        type: String,
        required: true,
        trim: true
    },
    setor: {
        type: String,
        required: true,
    },
    // NOVO CAMPO: Adicionado o campo sexo
    sexo: {
        type: String,
        enum: ['Masculino', 'Feminino', 'Outro'],
        required: false, // Pode ser opcional dependendo da sua necessidade
        trim: true,
    }
}, {
    timestamps: true
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;