import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import {errors} from "celebrate"; // Validações

const port = 3333;
const app = express();

// Expor as rotas
app.use(cors());

// Para entender o body json
app.use(express.json());

// Para utilizar as rotas
app.use(routes);

// Prover arquivos estáticos, imagem, pdf e etc, de uma pasta
// Para acessar o arquivo na URL: http://localhost:3333/uploads/oleo.svg
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Validação de erros do celebrate
app.use(errors());

console.log(`Running on the port ${port}`);
app.listen(port);
