var mysql = require('mysql');

const { database } = require('../config/config')

//初始化创建一个连接，相当于单例模式
var connection = mysql.createConnection(database);

//开始连接
connection.connect();


function exec(sql){
  const promise = new Promise((resolve,reject)=>{
    connection.query(sql, function (error, results, fields) {
      if (error) {
        reject(error)
      }
      resolve(results)
    });
  })
  return promise
}

//关闭连接

module.exports = exec