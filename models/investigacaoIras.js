// models/InvestigacaoIRAS.js

import mongoose from 'mongoose';

const investigacaoIrasSchema = new mongoose.Schema({
  nomePaciente: { type: String, required: true },
  numeroRegistro: { type: String, required: true, unique: true }, // Referente ao "Nº Zero Dia"
  dataAdmissao: Date,
  idade: Number,
  sexo: String,
  unidadeInternacao: String,
  outraUnidade: String,
  leito: String,
  profissionalSolicitante: String,
  diagnostico: String,
  encaminhado: String,
  dataPrimeiroSinal: Date,
  sinaisSintomas: [String],
  outrosSinais: String,
  procedimentoInvasivo: String,
  procedimentos: [String],
  outrosProcedimentos: String,
  procedimentoCirurgicoDescricao: String,
  exames: [String],
  outrosExames: String,
  materialColetado: String,
  microrganismo: String,
  usoAntimicrobiano: String,
  antimicrobianoUsado: String,
  mudancaAntimicrobiano: String,
  novaPrescricao: String,
  observacoes: String,
}, {
  timestamps: true // Para registrar a data de criação e atualização do formulário
});

export default mongoose.model('InvestigacaoIRAS', investigacaoIrasSchema);