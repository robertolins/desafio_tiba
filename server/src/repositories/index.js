const CategoryRepository = require('./category-repository')
const ProductRepository = require('./product-repository')
const SaleRepository = require('./sale-repository')

module.exports = {
    CategoryRepository: new CategoryRepository(),
    ProductRepository: new ProductRepository(),
    SaleRepository: new SaleRepository()
}