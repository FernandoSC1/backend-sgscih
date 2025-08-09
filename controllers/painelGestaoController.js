// backend/controllers/painelGestaoController.js
import Paciente from '../models/Paciente.js';
import Antimicrobiano from '../models/Antimicrobiano.js';
import Cultura from '../models/Cultura.js';
import Dispositivo from '../models/Dispositivo.js';
import InvestigacaoIRAS from '../models/investigacaoIras.js';
import mongoose from 'mongoose';

// ... (as funções getAtualizacoesDiarias e getUsoAntimicrobianos permanecem as mesmas) ...
export const getAtualizacoesDiarias = async (req, res) => {
    try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);

        const atualizacoes = await Paciente.aggregate([
            {
                $lookup: {
                    from: 'dispositivos',
                    let: { paciente_id: '$_id' },
                    pipeline: [ { $match: { $expr: { $eq: ['$pacienteId', '$$paciente_id'] }, updatedAt: { $gte: hoje, $lt: amanha } } } ],
                    as: 'updatesDispositivos'
                }
            },
            {
                $lookup: {
                    from: 'culturas',
                    let: { paciente_id: '$_id' },
                    pipeline: [ { $match: { $expr: { $eq: ['$pacienteId', '$$paciente_id'] }, updatedAt: { $gte: hoje, $lt: amanha } } } ],
                    as: 'updatesCulturas'
                }
            },
            {
                $lookup: {
                    from: 'antimicrobianos',
                    let: { paciente_id: '$_id' },
                    pipeline: [ { $match: { $expr: { $eq: ['$pacienteId', '$$paciente_id'] }, updatedAt: { $gte: hoje, $lt: amanha } } } ],
                    as: 'updatesAntimicrobianos'
                }
            },
            {
                $match: {
                    $or: [
                        { 'updatesDispositivos': { $ne: [] } },
                        { 'updatesCulturas': { $ne: [] } },
                        { 'updatesAntimicrobianos': { $ne: [] } }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    numeroZeroDia: 1,
                    nome: 1,
                    alteracaoDispositivo: { $gt: [{ $size: '$updatesDispositivos' }, 0] },
                    alteracaoCultura: { $gt: [{ $size: '$updatesCulturas' }, 0] },
                    alteracaoAntimicrobiano: { $gt: [{ $size: '$updatesAntimicrobianos' }, 0] }
                }
            }
        ]);

        res.status(200).json(atualizacoes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar atualizações diárias', error: error.message });
    }
};

export const getUsoAntimicrobianos = async (req, res) => {
    try {
        const hoje = new Date();

        const pacientesEmUso = await Antimicrobiano.aggregate([
            {
                $match: {
                    fimTratamento: { $eq: null }
                }
            },
            {
                $lookup: {
                    from: 'pacientes',
                    localField: 'pacienteId',
                    foreignField: '_id',
                    as: 'pacienteInfo'
                }
            },
            {
                $unwind: '$pacienteInfo'
            },
            {
                $addFields: {
                    diasDeUso: {
                        $max: [0, {
                            $floor: {
                                $divide: [
                                    { $subtract: [hoje, '$inicioTratamento'] },
                                    1000 * 60 * 60 * 24
                                ]
                            }
                        }]
                    }
                }
            },
            {
                $addFields: {
                    alertaUsoProlongado: { $gt: ['$diasDeUso', 7] }
                }
            },
            {
                $group: {
                    _id: '$pacienteId',
                    nome: { $first: '$pacienteInfo.nome' },
                    numeroZeroDia: { $first: '$pacienteInfo.numeroZeroDia' },
                    antimicrobianos: {
                        $push: {
                            _id: '$_id',
                            nomeMedicamento: '$nomeMedicamento',
                            diasDeUso: '$diasDeUso',
                            alertaUsoProlongado: '$alertaUsoProlongado'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    nome: 1,
                    numeroZeroDia: 1,
                    antimicrobianos: 1
                }
            }
        ]);

        res.status(200).json(pacientesEmUso);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar uso de antimicrobianos', error: error.message });
    }
};


// =======================================================
// LÓGICA PARA A TERCEIRA TELA: INVESTIGAÇÕES DE IRAS (ATUALIZADO)
// =======================================================
export const getInvestigacoesAtivas = async (req, res) => {
    try {
        const investigacoes = await InvestigacaoIRAS.aggregate([
            {
                $lookup: {
                    from: 'pacientes',
                    localField: 'numeroRegistro',
                    foreignField: 'numeroZeroDia',
                    as: 'pacienteInfo'
                }
            },
            // CORREÇÃO: Adicionada uma etapa para garantir que apenas investigações
            // com um paciente correspondente prossigam. Isso torna a consulta mais segura.
            {
                $match: {
                    "pacienteInfo": { $ne: [] }
                }
            },
            {
                $unwind: '$pacienteInfo'
            },
            {
                $lookup: {
                    from: 'culturas',
                    localField: 'pacienteInfo._id',
                    foreignField: 'pacienteId',
                    as: 'culturasRelacionadas'
                }
            },
            {
                $project: {
                    _id: 1,
                    dataPrimeiroSinal: 1,
                    sinaisSintomas: 1,
                    'pacienteInfo._id': 1,
                    'pacienteInfo.nome': 1,
                    'pacienteInfo.numeroZeroDia': 1,
                    'culturasRelacionadas.tipoCultura': 1,
                    'culturasRelacionadas.resultado': 1,
                    'culturasRelacionadas._id': 1
                }
            }
        ]);

        res.status(200).json(investigacoes);
    } catch (error) {
        console.error("Erro na agregação de investigações:", error); // Adiciona um log mais detalhado no servidor
        res.status(500).json({ message: 'Erro ao buscar investigações de IRAS', error: error.message });
    }
};
