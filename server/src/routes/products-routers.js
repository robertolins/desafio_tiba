const router = require('express').Router();
const ProductController = require('../controllers/product-controller')

router
    .get('/products', ProductController.listAll)
    .get('/products/solds', ProductController.getProductsSolds)
    .get('/products/:id', ProductController.getById)
    .post('/products', ProductController.add)
    .put('/products/:id', ProductController.edit)
    .delete('/products/:id', ProductController.remove)

module.exports = router