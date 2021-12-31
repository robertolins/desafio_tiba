const productsRouters = require('./products-routers');
const categoriesRouters = require('./categories-routers');
const salesRouters = require('./sales-routers');
const stocksRouters = require('./stocks-routers');

module.exports = app => {
    app.use(
        productsRouters,
        categoriesRouters,
        salesRouters,
        stocksRouters
    )
}