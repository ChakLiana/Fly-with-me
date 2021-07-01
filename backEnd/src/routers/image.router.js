// Router for image upload

const { Router } = require('express')
const {imageController} = require('../controllers/image.controller')


const imageRouter = Router()

imageRouter.post("/", imageController)

module.exports = imageRouter
