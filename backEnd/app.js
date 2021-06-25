const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dbConnect = require('./src/db/dbConect');
const app = express();
const PORT = 8080;

// Импорт ручек
const iventRouter = require('./src/routers/iventRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));

dbConnect();

// Подключение ручек
app.use('/ivent', iventRouter);

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});
