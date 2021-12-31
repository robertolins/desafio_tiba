const { DefineError } = require('../errors');

const StockService = require('../services/stock-service')
const stockService = new StockService()

class StockController {
    static async all(req, res){
        try{
            const stock = await stockService.all()
            return res.status(200).json(stock)
        }catch(err){
            return DefineError.getError(err, res)
        }
    } 
}

module.exports = StockController