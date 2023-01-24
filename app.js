require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const LastError = require('./errors/LastError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routerUser = require('./routes/user');
const routerMovie = require('./routes/movies');
const routerMain = require('./routes/main');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err;
  console.log('Подключение к Mongo установлено');
});
app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(requestLogger);
app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/', routerUser);
app.use('/', routerMovie);
app.use('/', routerMain);

app.use(errorLogger);
app.use(errors());
app.use(LastError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
