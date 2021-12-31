const { InvalidArgumentError, NotFoundError } = require('../errors');

const CrudServices = require('./crud-services')
const ProductService = require('./product-service')
const ProductSaleRepository = require('../repositories/product-sale-repository')

const models = require('../models')

class SaleService extends CrudServices {
  constructor(){
    super('SaleRepository')
    this.ProductService = new ProductService()
    this.ProductSaleRepository = new ProductSaleRepository()
  }

  valid(data){
    return new Promise(async (resolve, reject) => {
      if(data.client !== undefined && data.client.length > 0){
        if(data.products !== undefined && data.products.length > 0){
          await Promise.all(data.products.map(async (product) => {
            if(product.id !== undefined && product.id !== ''){
              if(product.quantity !== undefined && product.quantity !== '' && Number(product.quantity) > 0){
                const productFound = await this.ProductService.getOne({id: product.id})
                if(productFound){
                  if(productFound.quantity < 0){
                    reject(new InvalidArgumentError(`O produto ${productFound.name} não possui em estoque`))
                  }else if(Number(productFound.quantity) < Number(product.quantity)){
                    reject(new InvalidArgumentError(`A quantidade solicitada do produto ${productFound.name} é superior ao estoque`))
                  }
                }else{
                  reject(new NotFoundError('Produto não localizado'))
                }
              }else{
                reject(new InvalidArgumentError('Quantidade inválida em um dos produtos'))
              }
            }else{
              reject(new InvalidArgumentError('Produto não identificado'))
            }
          }))      
        }else{
          reject(new InvalidArgumentError('Nenhum produto informado'))
        }  
      }else{
        reject(new InvalidArgumentError('O cliente deve ser informado'))
      }
      resolve()
    })
  }

  async add(data) {
    return await this.valid(data)
      .then(async () => {
        const saleCreated = await super.add({client: data.client, value: 0.00, status: true})

        let amount = 0.00;
        await Promise.all(data.products.map(async (product) => {
          const productFound = await this.ProductService.getOne({id: product.id})
          await this.ProductSaleRepository.add({product_id: productFound.id, sale_id: saleCreated.id, value: productFound.value, quantity: product.quantity})

          amount += (parseFloat(productFound.value) * product.quantity)

          const quantityUpdated = productFound.quantity - product.quantity
          await this.ProductService.edit(
            {
              id: productFound.id,
              category_id: productFound.category_id,
              name: productFound.name,
              description: productFound.description,
              value: productFound.value,
              quantity: quantityUpdated
            }, productFound.id)
        }))

        await super.edit({value: amount}, saleCreated.id)
        const saleUpdated = await super.getOne({id: saleCreated.id})

        return saleUpdated
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

  async getAmount(){
    const amount = await super.getOne(
        {},
        {
            attributes: [
                [models.sequelize.fn('SUM', models.sequelize.col('value')), 'total_amount'],
                [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total_quantity']
            ],
            where: {status: 1}
        }
    )

    return amount
  }
}

module.exports = SaleService