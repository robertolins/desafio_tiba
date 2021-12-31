const router = require('express').Router();
const StockController = require('../controllers/stock-controller')

router
    .get('/stocks', StockController.all)

module.exports = router