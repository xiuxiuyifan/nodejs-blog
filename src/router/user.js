const { addUser, userLogin } = require("../dao/user")
const { setRedis } = require("../db/redis")
const { SuccessVo, ErrorVo } = require("../lib/resultVo")

//计算cookie 的expires时间

const computedExpiresTime = ()=>{
  const time = new Date()
  time.setTime(time.getTime() + (24 * 60 * 60 * 1000))
  return time.toGMTString()
}

const handleUserRouter = (req,res)=>{
  const method = req.method
  const path = req.path

  //新增用户
  if(method === 'POST' && path === '/api/user/add'){
    let {username,password,realname} = req.body
    return addUser(username, password, realname).then((dbData)=>{
      if (dbData.affectedRows===1){
        return new SuccessVo('新增用户成功',true)
      }else{
        return new ErrorVo('新增用户失败',false)
      }
    })
  }


  //登录
  if(method ==='POST' && path === '/api/user/login'){
    //查询username和password是否一致，
    let {username,password} = req.body
    console.log(username,password)
    //如果一致的话就登陆成功并且设置cookie到浏览器端即可
    return userLogin(username,password).then((dbData)=>{
      console.log(dbData)
      if(dbData.username){
        req.session.username = dbData.username
        req.session.realname = dbData.realname
        setRedis(req.sessionId,req.session)
        return new SuccessVo('登陆成功',true)
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

}


module.exports = handleUserRouter