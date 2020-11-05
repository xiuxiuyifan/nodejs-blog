const handleUserRouter = (req,res)=>{
  const method = req.method
  const path = req.path

  //新增用户
  if(method === 'POST' && path === '/api/user/add'){
    
  }


  //登录
  if(method ==='POST' && path === '/api/user/login'){
    return {
      code:200,
      msg:'',
      data:{

      }
    }
  }

}


module.exports = handleUserRouter