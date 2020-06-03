import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//acesso de arquivos estaticos(cadastro dos items a serem utilizados na tabela items)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);


