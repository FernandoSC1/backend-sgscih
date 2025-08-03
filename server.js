import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Importa a função de conexão

// Importar rotas
import pacienteRoutes from './routes/pacienteRoutes.js';
import dispositivoRoutes from './routes/dispositivoRoutes.js';
import culturaRoutes from './routes/culturaRoutes.js';
import antimicrobianoRoutes from './routes/antimicrobianoRoutes.js';
import investigacaoIrasRoutes from './routes/investigacaoIrasRoutes.js';

dotenv.config();

// Chama a função para conectar ao banco de dados
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// Middlewares
app.use(cors());
app.use(express.json());

// Usar as rotas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/culturas', culturaRoutes);
app.use('/api/antimicrobianos', antimicrobianoRoutes);
app.use('/api/investigacao-iras', investigacaoIrasRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});