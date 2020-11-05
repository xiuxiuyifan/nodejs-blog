const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


//获取post请求传递过了的数据，目前只考虑application/json的情况
const getPostData = (req) =>{
  const promise = new Promise((resolve,reject)=>{
    //不是post请求
    if(req.method !=='POST'){
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json'){
      resolve({})
      return
    }
    var post = '';

    req.on('data', function (chunk) {
      post += chunk;
    });

    req.on('end', function () {
      if(!post){
        resolve({})
        return
      }
      resolve(JSON.parse(post))
    });
  })
  return promise
}

const httpHandle = (req,res) => {
  //设置返回格式
  res.setHeader('Content-type','application/json')

  //获取path 
  const url = req.url
  req.path = url.split('?')[0]


  //解析query
  req.query = querystring.parse(url.split('?')[1])

  //解析post数据
  getPostData(req)
  .then((postData)=>{
    req.body = postData
    //处理blog相关路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then((blogRes) => {
        if (blogRes) {
          res.end(JSON.stringify(blogRes))
        }
      })
      return
    }


    //处理user相关路由,这块返回的promise有可能是一个reject
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then((userRes) => {
        if (userRes) {
          res.end(JSON.stringify(userRes))
          return
        }
      })
    }


    //未命中的路由

    res.writeHeader(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = httpHandle