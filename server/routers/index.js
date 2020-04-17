const router = require('express').Router()
const MainController = require('../controllers/mainController')

router.get('/getData', MainController.getAPI)

module.exports = router