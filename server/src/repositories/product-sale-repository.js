const CrudRepository = require('./crud-repository')

class ProductSaleRepository extends CrudRepository{
  constructor() {
    super('ProductSale')
  }
}

module.exports = ProductSaleRepository