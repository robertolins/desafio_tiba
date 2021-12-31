const CrudRepository = require('./crud-repository')

class SaleRepository extends CrudRepository{
  constructor() {
    super('Sale')
  }
}

module.exports = SaleRepository