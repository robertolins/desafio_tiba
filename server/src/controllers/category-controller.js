const { DefineError } = require('../errors');

const CategoryService = require('../services/category-service')
const categoryService = new CategoryService()

class CategoryController {
    static async listAll(req, res){
        try{
            const categories = await categoryService.listAll({})
            return res.status(200).json(categories)
        }catch(err){
            return DefineError.getError(err, res)
        }
    } 

    static async getById(req, res){
        const { id } = req.params
        try{
            const category = await categoryService.getOne({id})
            return res.status(200).json(category)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async add(req, res){
        const infoCategory = req.body
        try{
            const categoryCreated = await categoryService.add(infoCategory)
            return res.status(201).json(categoryCreated)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async edit(req, res){
        const { id } = req.params
        const infoCategory = req.body
        try{
            const categoryUpdated = await categoryService.edit(infoCategory, id)
            return res.status(200).json(categoryUpdated)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async remove(req, res){
        const { id } = req.params
        try{
            await categoryService.remove(id)
            return res.status(204).send()
        }catch(err){
            return DefineError.getError(err, res)
        }
    }
}

module.exports = CategoryController