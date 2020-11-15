const querystring = require('querystring')
const { getRedis, setRedis } = require('./src/db/redis')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


//获取post请求传递过了的数据，目前只考虑application/json的情况
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    //不是post请求
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'].toLowerCase() !== 'application/json; charset=utf-8') {
      resolve({})
      return
    }
    var post = '';
    req.on('data', function (chunk) {
      post += chunk;
    });

    req.on('end', function () {
      if (!post) {
        resolve({})
        return
      }
      resolve(JSON.parse(post))
    });
  })
  return promise
}

//解析cooike为json的形式
const parsingCookie = (req) => {
  let cookieStr = req.headers.cookie || ''
  let list = cookieStr.split(';')
  let cookie = {}
  list.forEach((item, index) => {
    if (!item) return
    let arr = item.split('=')
    let key = arr[0].trim()
    let value = arr[1].trim()
    cookie[key] = value
  })
  return cookie
}

//cookie 生成过期时间
const computedExpiresTime = () => {
  const time = new Date()
  time.setTime(time.getTime() + (24 * 60 * 60 * 1000))
  return time.toGMTString()
}
//用来存放session的一个变量
const SESSION_DATA = {}

const httpHandle = (req, res) => {
  //设置返回格式
  res.setHeader('Content-type', 'application/json')

  //获取path 
  const url = req.url
  req.path = url.split('?')[0]


  //解析query
  req.query = querystring.parse(url.split('?')[1])

  //解析cookie并添加到req.cookie中
  req.cookie = parsingCookie(req)

  //解析session 
  //先判断客户端是否携带cookie过来
  // let userId = req.cookie.userid
  // let needSetCookie = false
  // if (userId) {
  //   //检测session中是否存在当前cookie这个键值key
  //   if (SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = SESSION_DATA[userId]
  //   } else {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   //初始化一个空值
  //   userId = new Date().getTime() + Math.random()
  //   SESSION_DATA[userId] = {}
  //   needSetCookie = true
  // }
  //从SESSION_DATA中去寻找当前cookie中的userid 对应的值   共同指向一块内存地址
  // req.session = SESSION_DATA[userId]

  let needSetCookie = false
  let userId = req.cookie.userid
  //只要cookie中没有userid 就把redis中的session设置为 {}
  //并生成新的 userId 
  if (!userId) {
    needSetCookie = true
    //需要设置cookie 
    userId = new Date().getTime() + Math.random()
    //初始化sessionData
    setRedis(userId, {})
  }
  req.sessionId = userId

  getRedis(req.sessionId)
    .then((sessionData) => {
      if (sessionData == null) {
        //初始化redis 中的session
        setRedis(userId, {})
        //设置session
        req.session = {}
      } else {
        req.session = sessionData
      }
      return getPostData(req)
    })
    //解析post数据
    .then((postData) => {
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
            if (needSetCookie) {
              res.setHeader("Set-cookie", `userid=${userId}; path=/; httpOnly; expires=${computedExpiresTime()}`)
            }
            res.end(JSON.stringify(userRes))
          }
        })
        return
      }


      //未命中的路由

      res.writeHeader(404, { 'Content-type': 'text/plain' })
      res.write('404 Not Found\n')
      res.end()
    })
    .catch((error) => { console.log(error) })
}

module.exports = httpHandle