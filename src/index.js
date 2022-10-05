const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./routes/talkerRoute');
const loginRouter = require('./routes/loginRoute');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(express.json());

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Online na porta: ${PORT}`);
});
