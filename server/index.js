require('dotenv').config()
const app = require('./app')
const routes = require('./src/routes')

routes(app)

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log('Server listing in port ' + PORT))