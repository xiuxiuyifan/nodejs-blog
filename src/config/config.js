//根据环境变量输出不同的配置

const NODE_ENV = process.env.NODE_ENV

let database = {}

if(NODE_ENV === 'dev'){
  database = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'myblog'
  }
}
if(NODE_ENV === 'production'){
  database = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'myblog'
  }
}

module.exports = {
  database
}