require('dotenv').config();
const express = require('express');

const { productsRouter, salesRouter } = require('./routes/index');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use('/products', salesRouter);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
