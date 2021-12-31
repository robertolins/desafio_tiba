const repositories = require('../repositories')

class CrudServices {

  constructor(repository) {
    this.repository = repository
  }

  async listAll(where = {}, others = {}) {
    return await repositories[this.repository].listAll(where, others)
  }

  async getOne(where = {}, others = {}) {
    return await repositories[this.repository].getOne(where, others)
  }

  async add(data) {
    return await repositories[this.repository].add(data)
  }

  async edit(data, id){      
    return await repositories[this.repository].edit(data, id)
  }

  async remove(id) {
    return await repositories[this.repository].remove(id)
  }
}

module.exports = CrudServices