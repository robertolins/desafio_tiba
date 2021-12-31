const { InvalidArgumentError, NotFoundError } = require('../errors');
const ProductService = require('./product-service')
const models = require('../models')

class StockService {
    constructor(){
        this.ProductService = new ProductService()
    }

    async all(){
        const stockProducts = await this.ProductService.getOne(
            {},
            {
                attributes: [
                    [models.sequelize.fn('SUM', models.sequelize.col('Product.quantity')), 'total_stock'],
                    [models.sequelize.fn('COUNT', models.sequelize.col('Product.id')), 'quantity_products']
                ],
                where: {active: 1}
            }
        )

        return stockProducts
    }
}

module.exports = StockService