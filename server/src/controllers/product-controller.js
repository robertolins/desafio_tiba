const { DefineError } = require('../errors');

const ProductService = require('../services/product-service')
const productService = new ProductService()

class ProductController {
    static async listAll(req, res){
        try{
            const products = await productService.listAll({}, {include: 'category'})
            return res.status(200).json(products)
        }catch(err){
            return DefineError.getError(err, res)
        }
    } 

    static async getById(req, res){
        const {id} = req.params
        try{
            const product = await productService.getOne({id})
            return res.status(200).json(product)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async add(req, res){
        const infoProduct = req.body
        try{
            const productCreated = await productService.add(infoProduct)
            return res.status(201).json(productCreated)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async edit(req, res){
        const {id} = req.params
        const infoProduct = req.body
        try{
            const productUpdated = await productService.edit(infoProduct, id)
            return res.status(200).json(productUpdated)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async remove(req, res){
        const {id} = req.params
        try{
            await productService.remove(id)
            return res.status(204).send()
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async getProductsSolds(req, res){
        try{
            const productsSolds = await productService.listAllProductsSolds()
            return res.status(200).json(productsSolds)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }
}

module.exports = ProductController