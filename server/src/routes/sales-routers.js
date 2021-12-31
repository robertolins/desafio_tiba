const router = require('express').Router();
const SaleController = require('../controllers/sale-controller')

router
    .get('/sales', SaleController.listAll)
    .get('/sales/amount', SaleController.getAmount)
    .get('/sales/:id', SaleController.getById)
    .post('/sales', SaleController.add)

module.exports = router