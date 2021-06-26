const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dbConnect = require('./src/db/dbConect');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./src/passport/index');


const app = express()
const PORT = 8080
// подключаем multer для поддержки загрузки картинок
const multer = require('multer') 



// Импорт ручек
const iventRouter = require('./src/routers/iventRouter');
const routes = require('./src/routers/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('dev'));
app.use(session({
  secret:  'this is the default passphrase',
  store: MongoStore.create({ mongoUrl: 
    'mongodb+srv://admin:admin@myclaster.juvuz.mongodb.net/Fly-With-Me?retryWrites=true&w=majority'}),
  resave: false,
  saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser



// Подключение ручек
app.use('/ivent', iventRouter);
app.use(routes);

// multer section 
// задаём параметры хранилища
const store = multer.diskStorage({
    destination(req, file, cb) {
          cb(null, './src/public/images'); // папка файлов на сервере
        },
    filename(req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname); // Каждому файлу поставим дату 
        },
});
// прописываем функции для приёма файлов
const upload = multer({ storage: store }).single('file'); // загрузка одного файла
const uploadMany = multer({ storage: store }).array('files'); // загрузка массива файлов

// прописываем "ручки" 
app.put('/image', upload, (req, res, next) => {
   req.body.file // файл 
   res.sendStatus(200)
});
app.put('/image', uploadMany, (req, res, next) => {
   req.body.files // массив файлов
   res.sendStatus(200)
});
dbConnect()




app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});
