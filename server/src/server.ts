// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar alguma informação existente
// DELETE: Deletar alguma informação existente

// CORPO (Request Body): Dados para criação ou atualização de um registro  
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, ordenação

import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors);
app.use(express.json());
app.use(routes);


app.listen(3333);

