// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Importar rotas
import pacienteRoutes from './routes/pacienteRoutes.js';
import dispositivoRoutes from './routes/dispositivoRoutes.js';
import culturaRoutes from './routes/culturaRoutes.js';
import antimicrobianoRoutes from './routes/antimicrobianoRoutes.js';
import investigacaoIrasRoutes from './routes/investigacaoIrasRoutes.js';
import painelGestaoRoutes from './routes/painelGestaoRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// --- CONFIGURAÇÃO DE CORS PARA PRODUÇÃO ---
// Substitua 'https://seu-frontend.vercel.app' pela URL real do seu app na Vercel
const whitelist = [process.env.FRONTEND_URL, 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // Permite a requisição se a origem estiver na whitelist ou se for a mesma origem (ex: Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
// --- FIM DA CONFIGURAÇÃO DE CORS ---

app.use(express.json());

// Usar as rotas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/culturas', culturaRoutes);
app.use('/api/antimicrobianos', antimicrobianoRoutes);
app.use('/api/investigacao-iras', investigacaoIrasRoutes);
app.use('/api/painel', painelGestaoRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
