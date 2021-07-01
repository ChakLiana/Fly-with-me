/* eslint-disable max-len */
const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true, // говорим mongoose, что строка подключения будет в новом формате (новый формат должен обязательно содеражт порт)
  useFindAndModify: false, // заставляем методы findOneAndUpdate() и findOneAndRemove() использовать нативный (т.е предоставленный самой mongodb) метод findOneAndUpdate() вместо findAndModify()
  useCreateIndex: true, // Заставляем mongoose работать с функцией createIndex() драйвера mongodb вместо ensureIndex(). Так как последний помечен драйвером mongodb, как устаревший
  useUnifiedTopology: true, // заставляем mongoose использование новый механизм управления подключением драйвера mongodb.
  poolSize: 10, // максимальное количество сокетов, которые драйвер MongoDB будет держать открытыми для этого соединения
  bufferMaxEntries: 0, // говорим mongoose перестать выполнять любые операции с базой данных, после того как произодет отключение от последней.
  // В противном случае mongoose пытается дождаться восстановления соездинения, для завершения  операций
}


// const dbConnectionURL = 'mongodb+srv://admin:admin@myclaster.juvuz.mongodb.net/Fly-With-Me?retryWrites=true&w=majority'
const dbConnectionURL = 'mongodb://127.0.0.1:27017/Fly-With-Me'
// mongodb://localhost:27017/p1w3d3

function connect() {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) console.error('ERROR WITH DB')

    console.log('Connect to DB')
  })
}

function disconnect() {
  mongoose.disconnect()
}

module.exports = { connect, disconnect, dbConnectionURL }
