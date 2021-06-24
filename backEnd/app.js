const express = require('express')
const cors = require('cors')
const logger = require('morgan');
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(logger('dev'));

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT)
})
