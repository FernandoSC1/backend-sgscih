import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
        console.error('Erro de conexão com o MongoDB:', err.message);
        process.exit(1); // Sai do processo com falha
    }
};

export default connectDB;
