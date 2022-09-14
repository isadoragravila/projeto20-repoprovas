import app from './index';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT);

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`));