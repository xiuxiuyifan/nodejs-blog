const http = require('http')
const PORT = 3000

const httpHandle = require('../app')

const server = http.createServer(httpHandle)

server.listen(PORT)
console.log('启动')