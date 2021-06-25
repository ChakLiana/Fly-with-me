const express = require('express')
const cors = require('cors')
const logger = require('morgan');
const dbConnect = require('./src/db/dbConect');
const app = express()
const PORT = 3007
// подключаем multer для поддержки загрузки картинок
const multer = require('multer') 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(logger('dev'));

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
});
app.put('/image', uploadMany, (req, res, next) => {
   req.body.files // массив файлов
});



dbConnect()

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT)
})
