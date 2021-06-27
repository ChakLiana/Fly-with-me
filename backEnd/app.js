const express = require('express')
const session = require('express-session')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const { dbConnectionURL, connect } = require('./src/db/db')
const authRouter = require('./src/routers/auth.router')
const usersRouter = require('./src/routers/users.router')
const iventRouter = require('./src/routers/iventRouter');
const app = express()
const PORT = 8080
const fileUpload = require("express-fileupload");

const multer = require("multer");
// 1. Token generation 
const jwt = require ( 'jsonwebtoken' )
// const secret = '009dsf993nnsllIIhjew]]qnysahgdj'
// function generateAccessToken (username) {
//   return jwt.sign( username, secret, { expiresIn: '1800s'} )  

// }

// DB CONNTECTION
connect()

// SERVER'S SETTINGS
app.set('cookieName', 'печенька')

// APP'S MIDDLEWARES
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())
app.use(session({
  name: app.get('cookieName'),
  secret: 'our secret key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConnectionURL,
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
  },
}))
app.use(fileUpload());

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;

  uploadPath = __dirname + "/src/public/images/" + sampleFile.name;
  console.log("upload PATH _____", uploadPath);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});
// APP'S ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/ivent', iventRouter);

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


app.listen(PORT, () => {
  console.log('Server has been started on PORT ', PORT)
})
