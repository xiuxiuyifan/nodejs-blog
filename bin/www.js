const http = require('http')
const PORT = 8080

const httpHandle = require('../app')

const server = http.createServer(httpHandle)

server.listen(PORT)
console.log('启动')