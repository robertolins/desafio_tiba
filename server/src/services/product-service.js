const { InvalidArgumentError, NotFoundError } = require('../errors');

const CrudServices = require('./crud-services')
const CategoryRepository = require('../repositories/category-repository')
const ProductSaleRepository = require('../repositories/product-sale-repository')

const models = require('../models')

class ProductService extends CrudServices {
  constructor(){
    super('ProductRepository')
    this.categoryRepository = new CategoryRepository()
  }

  async valid(data){
    if(!data.category_id || typeof data.category_id == undefined || data.category_id == null){
      throw new InvalidArgumentError('A categoria do produto deve ser fornecida!')
    }else{
      if(!data.name || typeof data.name == undefined || data.name == null){
        throw new InvalidArgumentError('O nome do produto deve ser fornecido!')
      }else if(!data.description || typeof data.description == undefined || data.description == null){
        throw new InvalidArgumentError('A descrição do produto deve ser fornecida!')
      }else if(!data.quantity || typeof data.quantity == undefined || data.quantity == null || data.quantity < 0){
        throw new InvalidArgumentError('A quantidade do produto está inválida!')
      }else if(!data.value || typeof data.value == undefined || data.value == null || data.value < 0.00){
        throw new InvalidArgumentError('O valor do produto está inválido!')
      }else{
        const categoryFound = await this.categoryRepository.getOne({id: data.category_id})
        if(!categoryFound){
          throw new NotFoundError('Categoria informada no produto não encontrada!')
        }
      }
    }
    return true
  }

  async add(data) {
    return await this.valid(data)
      .then(async () => {
        if(!data.active || typeof data.active == undefined || data.active == null){
          data.active = true
        }
        return await super.add(data)
      })
      .catch(err => {
        if (err instanceof NotFoundError) {
            throw new NotFoundError(err.message)
        } else if (err instanceof InvalidArgumentError) {
            throw new InvalidArgumentError(err.message)
        } else {
          throw new Error(err.message)
        }
      })
  }

  async edit(data, id) {
    const product = await super.getOne({id})

    if(!product)
      throw new NotFoundError('Produto não encontrado!')

    if(this.valid(data)){
      await super.edit(data, id)
      const productUpdated = await super.getOne({id}, {include: 'category'})
      return productUpdated
    }
  }

  async remove(id){
    const product = await super.getOne({id})

    if(!product)
      throw new NotFoundError('Produto não encontrado!')

    await super.remove(id)
  }

  async listAllProductsSolds(){
    const productSaleRepository = new ProductSaleRepository()
    
    const productSolds = await productSaleRepository.listAll(
      {},
      {
        attributes: [
          [models.sequelize.fn('SUM', models.sequelize.col('ProductSale.value')), 'amount'],
          [models.sequelize.fn('SUM', models.sequelize.col('ProductSale.quantity')), 'total_sale']
        ],
        include: [
          {
            model: models.Sale,
            as:'sale',
            where: {status: true},
            attributes: []
          },
          {
            model: models.Product,
            as:'product',
            attributes: [['id', 'id'], ['name', 'name'], ['quantity', 'quantity_stock']]
          }
        ],
        group: ['product.id'],
        //order: [[models.sequelize.fn('SUM', models.sequelize.col('ProductSale.quantity')), 'DESC']]
      }
    )
    return productSolds
  }
}

module.exports = ProductService