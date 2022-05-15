const { Router } = require('express')
const { webControllers } = require('../controllers/webControllers/web.js')

const router = new Router()

router.get('/', webControllers.inicio)

module.exports = router