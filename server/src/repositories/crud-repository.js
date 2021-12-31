const models = require('../models')

class CrudRepository {
  constructor(model) {
    this.model = model
  }

  async listAll(where = {}, others = {}) {
    return await models[this.model].findAll({ where: { ...where }, ...others })
  }

  async getOne(where = {}, others = {}) {
    return models[this.model].findOne({ where: { ...where }, ...others })
  }

  async add(data) {
    return models[this.model].create(data)
  }

  async edit(data, id, transaction = {}){
    return models[this.model].update(data, { where: { id: id } }, transaction)
  }

  async remove(id) {
    return models[this.model].destroy({ where: { id: id } })
  }
}

module.exports = CrudRepository