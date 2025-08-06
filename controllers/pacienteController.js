import Paciente from '../models/Paciente.js';
import Dispositivo from '../models/Dispositivo.js';
import Cultura from '../models/Cultura.js';
import Antimicrobiano from '../models/Antimicrobiano.js';

// @desc    Cria um novo paciente
// @route   POST /api/pacientes
// @access  Public
export const createPaciente = async (req, res) => {
        try {
        const novoPaciente = new Paciente(req.body);
        await novoPaciente.save();
        res.status(201).json(novoPaciente);
    } catch (error) {
        // Verifica se é um erro de duplicidade (código 11000 do MongoDB para índice único)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.numeroZeroDia) {
            return res.status(400).json({ message: 'Número Zero Dia já existe. Por favor, insira um valor único.' });
        }
        res.status(400).json({ message: error.message });
    }
};

// @desc    Obtém todos os pacientes com filtros opcionais
// @route   GET /api/pacientes?nome=...&numeroZeroDia=...&dataAdmissaoInicio=...&dataAdmissaoFim=...&status=...&setor=... // <-- Nova adição aqui
// @access  Public
export const getAllPacientes = async (req, res) => {
    try {
        const { nome, numeroZeroDia, sexo, dataAdmissaoInicio, dataAdmissaoFim, status, setor } = req.query; // <-- Adicionado 'setor' aqui
        let query = {}; // Objeto de filtro para o Mongoose

        // Filtro por Nome (busca parcial e case-insensitive)
        if (nome) {
            query.nome = { $regex: nome, $options: 'i' }; // $options: 'i' para case-insensitive
        }

        // Filtro por Número Zero Dia (correspondência exata)
        if (numeroZeroDia) {
            query.numeroZeroDia = numeroZeroDia;
        }

        if (sexo) {
            query.sexo = sexo;
        }

        // Filtro por Período de Data de Admissão
        if (dataAdmissaoInicio || dataAdmissaoFim) {
            query.dataAdmissao = {};
            if (dataAdmissaoInicio) {
                // $gte: Greater Than or Equal (maior ou igual)
                query.dataAdmissao.$gte = new Date(dataAdmissaoInicio);
            }
            if (dataAdmissaoFim) {
                // $lte: Less Than or Equal (menor ou igual)
                // Para incluir o dia inteiro, adicionamos 23h59m59s999ms
                const endDate = new Date(dataAdmissaoFim);
                endDate.setUTCHours(23, 59, 59, 999);
                query.dataAdmissao.$lte = endDate;
            }
        }

        // Filtro por Status do Paciente
        if (status) {
            if (status === 'internado') {
                // Pacientes internados são aqueles que não têm data de alta ou a data de alta é vazia
                // Usamos $in para cobrir tanto null quanto string vazia, caso haja inconsistência nos dados
                query.dataAlta = { $in: [null, ''] };
            } else if (status === 'alta') {
                // Pacientes com alta são aqueles que têm uma data de alta preenchida e não nula
                query.dataAlta = { $ne: null, $ne: '' };
            }
        }

        // Filtro por Setor (busca parcial e case-insensitive) // <-- Adição da lógica do filtro de setor
        if (setor) {
            query.setor = { $regex: setor, $options: 'i' };
        }

        const pacientes = await Paciente.find(query);
        res.status(200).json(pacientes);
    } catch (error) {
        console.error('Erro ao buscar todos os pacientes:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar pacientes.' });
    }
};

// @desc    Obtém um paciente por ID
// @route   GET /api/pacientes/:id
// @access  Public
export const getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Atualiza um paciente por ID
// @route   PUT /api/pacientes/:id
// @access  Public
export const updatePaciente = async (req, res) => {
        try {
        const pacienteAtualizado = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pacienteAtualizado) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        res.status(200).json(pacienteAtualizado);
    } catch (error) {
        // Verifica se é um erro de duplicidade (código 11000 do MongoDB para índice único)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.numeroZeroDia) {
            return res.status(400).json({ message: 'Número Zero Dia já existe para outro paciente. Por favor, insira um valor único.' });
        }
        res.status(400).json({ message: error.message });
    }
};

// @desc    Obtém um paciente por NumeroZeroDia
// @route   GET /api/pacientes/numeroZeroDia/:numeroZeroDia
// @access  Public
export const getPacienteByNumeroZeroDia = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ numeroZeroDia: req.params.numeroZeroDia });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado com o Número Zero Dia fornecido.' });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtém o relatório de transferência de um paciente (usando ID do paciente)
// @route   GET /api/pacientes/relatorios/transferencia/:pacienteId
// @access  Public
export const getTransferenciaReport = async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;
        const paciente = await Paciente.findById(pacienteId);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }

        const dispositivos = await Dispositivo.find({ pacienteId }).sort({ createdAt: -1 });
        const culturas = await Cultura.find({ pacienteId }).sort({ dataColeta: -1 });
        const antimicrobianos = await Antimicrobiano.find({ pacienteId }).sort({ inicioTratamento: -1 });

        res.status(200).json({
            paciente,
            dispositivos,
            culturas,
            antimicrobianos,
        });
    } catch (error) {
        console.error('Erro ao gerar relatório de transferência:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao gerar relatório.' });
    }
};

// @desc    Obtém o relatório de transferência de um paciente (usando NumeroZeroDia)
// @route   GET /api/pacientes/relatorios/transferencia/numeroZeroDia/:numeroZeroDia
// @access  Public
export const getRelatorioTransferencia = async (req, res) => {
    let pacienteIdMongo; // Variável para armazenar o _id do MongoDB

    // Verifica se a requisição veio pela rota de numeroZeroDia
    if (req.params.numeroZeroDia) {
        try {
            const paciente = await Paciente.findOne({ numeroZeroDia: req.params.numeroZeroDia });
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente não encontrado com o Número Zero Dia fornecido.' });
            }
            pacienteIdMongo = paciente._id; // Pega o _id do paciente encontrado
        } catch (error) {
            console.error('Erro ao buscar paciente por Numero Zero Dia para relatório:', error);
            return res.status(500).json({ message: 'Erro interno ao buscar paciente.' });
        }
    } else if (req.params.pacienteId) { // Se a requisição veio pela rota de _id (legado)
        pacienteIdMongo = req.params.pacienteId;
    } else {
        return res.status(400).json({ message: 'Parâmetro de busca de paciente não fornecido.' });
    }

    try {
        const paciente = await Paciente.findById(pacienteIdMongo);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }

        const dispositivos = await Dispositivo.find({ pacienteId: pacienteIdMongo }).sort({ createdAt: -1 });
        const culturas = await Cultura.find({ pacienteId: pacienteIdMongo }).sort({ dataColeta: -1 });
        const antimicrobianos = await Antimicrobiano.find({ pacienteId: pacienteIdMongo }).sort({ inicioTratamento: -1 });

        res.status(200).json({
            paciente: paciente,
            dispositivos: dispositivos,
            culturas: culturas,
            antimicrobianos: antimicrobianos
        });

    } catch (error) {
        console.error('Erro ao gerar relatório de transferência:', error);
        res.status(500).json({ message: error.message });
    }
};

// NOVO CONTROLADOR PARA VERIFICAR DISPONIBILIDADE DO LEITO
// @desc    Verifica se um leito está ocupado por um paciente ativo
// @route   GET /api/pacientes/leito/verificar?leito=LEITO_NUM&pacienteId=ID_OPCIONAL
// @access  Public
export const verificarLeito = async (req, res) => {
    try {
        const { leito, pacienteId } = req.query;

        if (!leito) {
            return res.status(400).json({ message: 'Número do leito não fornecido.' });
        }

        // Critério de busca: leito correspondente E paciente sem data de alta (ativo)
        const query = {
            leito: leito,
            dataAlta: { $in: [null, ''] }
        };

        // Se estivermos editando um paciente, devemos excluir ele mesmo da busca.
        // Isso permite salvar o paciente com o seu próprio leito.
        if (pacienteId) {
            query._id = { $ne: pacienteId }; // $ne = Not Equal (Diferente de)
        }

        const pacienteOcupando = await Paciente.findOne(query);

        if (pacienteOcupando) {
            // Leito está ocupado por outro paciente
            return res.json({
                disponivel: false,
                paciente: {
                    nome: pacienteOcupando.nome,
                    numeroZeroDia: pacienteOcupando.numeroZeroDia
                }
            });
        }

        // Leito está disponível
        res.json({ disponivel: true });

    } catch (error) {
        console.error('Erro ao verificar leito:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};