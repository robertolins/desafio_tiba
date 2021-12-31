const { InvalidArgumentError, NotFoundError } = require('../errors');

const CrudServices = require('./crud-services')

class CategoryService extends CrudServices {
  constructor(){
    super('CategoryRepository')
  }

  valid(data){
    if(!data.name || typeof data.name == undefined || data.name == null){
      throw new InvalidArgumentError('O nome da categoria deve ser fornecido!')
    }else if(!data.description || typeof data.description == undefined || data.description == null){
      throw new InvalidArgumentError('A descrição da categoria deve ser fornecida!')
    }
    return true
  }

  async add(data) {
    if(this.valid(data)){
      if(!data.status || typeof data.status == undefined || data.status == null){
        data.status = true
      }
      return super.add(data)
    }
  }

  async edit(data, id) {
    const category = await super.getOne({id})

    if(!category)
      throw new NotFoundError('Categoria não encontrada!')

    if(this.valid(data)){
      await super.edit(data, id)
      const categoryUpdated = await super.getOne({id})
      return categoryUpdated
    }
  }

  async remove(id){
    const category = await super.getOne({id})

    if(!category)
      throw new NotFoundError('Categoria não encontrada!')

    await super.remove(id)
  }
}

module.exports = CategoryService