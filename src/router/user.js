const { addUser, userLogin, checkUsernameUnique } = require("../dao/user")
const { setRedis } = require("../db/redis")
const { SuccessVo, ErrorVo } = require("../lib/resultVo")

//计算cookie 的expires时间

const computedExpiresTime = ()=>{
  const time = new Date()
  time.setTime(time.getTime() + (24 * 60 * 60 * 1000))
  return time.toGMTString()
}

const handleUserRouter = async (req,res)=>{
  const method = req.method
  const path = req.path

  //新增用户
  if(method === 'POST' && path === '/api/user/add'){
    console.log('hihihihi')
    let {username,password,realname} = req.body
    console.log(username,password,realname)
    let checkResult = await checkUsernameUnique(username)
    console.log(checkResult)
    if(checkResult.length>0){
      return new ErrorVo('该用户名已注册！')
    }
    return addUser(username, password, realname).then((dbData)=>{
      if (dbData.affectedRows===1){
        return new SuccessVo('注册成功',true)
      }else{
        return new ErrorVo('注册失败',false)
      }
    })
  }


  //登录
  if(method ==='POST' && path === '/api/user/login'){
    //查询username和password是否一致，
    let {username,password} = req.body
    if (!username) {
      return new ErrorVo('请填写用户名！', false)
    }
    if (!password) {
      return new ErrorVo('请填写密码！', false)
    }
    //如果一致的话就登陆成功并且设置cookie到浏览器端即可
    return userLogin(username,password).then((dbData)=>{
      if(dbData.username){
        req.session.username = dbData.username
        req.session.realname = dbData.realname
        setRedis(req.sessionId,req.session)
        return dbData
      }
      return new ErrorVo('登陆失败', false)
    })
  }

  //修改密码
  if(method === 'POST' && path === '/api/user/edit'){
    
  }

  //测试
  if(method === 'GET' && path === '/api/user/test'){
    let session = req.session
    if(!session.username){
    }else{
      return Promise.resolve(new SuccessVo('已经登录',true))
    }
  }

  if(method === 'POST' && path === '/api/user/logout'){
    res.setHeader("Set-cookie",
      [`userid=; path=/; max-age=0}`,
        `username=; path=/; max-age=0}`
      ])
    return Promise.resolve(new SuccessVo('退出成功',true))
  }

}


module.exports = handleUserRouter