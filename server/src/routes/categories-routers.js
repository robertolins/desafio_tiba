const router = require('express').Router();
const CategoryController = require('../controllers/category-controller')

router
    .get('/categories', CategoryController.listAll)
    .get('/categories/:id', CategoryController.getById)
    .post('/categories', CategoryController.add)
    .put('/categories/:id', CategoryController.edit)
    .delete('/categories/:id', CategoryController.remove)

module.exports = router