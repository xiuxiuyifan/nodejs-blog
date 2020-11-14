const redis = require('redis')

//创建redis连接客户端
const redisClient = redis.createClient(6379,'127.0.0.1')

redisClient.on('error',(err)=>{
  console.log(err)
})

function setRedis(key,value) {
  //如果是引用类型的话，就进行序列化
  if(typeof value === 'object'){
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
}

function getRedis(key) {
  const promise = new Promise((resolve,reject)=>{
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      if(data == null){
        resolve(null)
        return
      }
      try{
        resolve(JSON.parse(data))
      }catch(error){
        reject(error)
      }
    })
  })

  return promise
}

module.exports = {
  setRedis,
  getRedis
}