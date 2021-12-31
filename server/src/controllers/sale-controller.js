const { DefineError } = require('../errors');

const SaleService = require('../services/sale-service')
const saleService = new SaleService()

class SaleController {
    static async listAll(req, res){
        try{
            const sales = await saleService.listAll({}, {include: 'products'})
            return res.status(200).json(sales)
        }catch(err){
            return DefineError.getError(err, res)
        }
    } 

    static async getById(req, res){
        const {id} = req.params
        try{
            const sale = await saleService.getOne({id})
            return res.status(200).json(sale)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async add(req, res){
        console.log(req.body)
        const infoSale = req.body
        try{
            const saleCreated = await saleService.add(infoSale)
            return res.status(201).json(saleCreated)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }

    static async getAmount(req, res){
        try{
            const sale = await saleService.getAmount()
            return res.status(200).json(sale)
        }catch(err){
            return DefineError.getError(err, res)
        }
    }
}

module.exports = SaleController