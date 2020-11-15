const { SuccessVo, ErrorVo } = require("../lib/resultVo")

const { getList, getDetail, addBlog, updateBlog,deleteBlog } = require("../dao/blog")

const checkLogin = (req) => {
  if(!req.session.username){
    return Promise.resolve(new ErrorVo('尚未登录', false))
  }
}

const handleBlogRouter = (req,res) => {
  //获取请求url
  //获取请求方式
  const method = req.method
  const path = req.path

  //获取博客列表
  if(method === 'GET' && path === '/api/blog/list'){
    let {keyword,author} = req.query
    return getList(author,keyword).then((dbData)=>{
      return new SuccessVo('请求成功',dbData)
    })
  }

  //获取博客详情
  if(method === 'GET' && path === '/api/blog/detail'){
    let {id} = req.query
    return getDetail(id).then((dbData)=>{
      return new SuccessVo('请求成功',dbData[0])
    })
  }

  //新建博客

  if(method === 'POST' && path === '/api/blog/add'){
    //检测是否登录
    let isLogin = checkLogin(req)
    if(isLogin){
      return isLogin
    }
    let {title,content} = req.body
    let author = req.session.username
    return addBlog(title,content,author).then((dbData)=>{
      if (dbData.affectedRows ===1){
        return new SuccessVo('新增成功',true)
      }else{
        return new ErrorVo('新增失败',false)
      }
    })
  }

  //更新博客
  if(method === 'POST' && path === '/api/blog/update'){
    //检测是否登录
    let isLogin = checkLogin(req)
    if (isLogin) {
      return isLogin
    }
    let { id, title, content } = req.body
    return updateBlog(id, title, content).then((dbData)=>{
      if (dbData.affectedRows === 1) {
        return new SuccessVo('更新成功', true)
      } else {
        return new ErrorVo('更新失败', false)
      }
    })
  }
  //删除博客

  if(method === 'POST' && path === '/api/blog/delete'){
    //检测是否登录
    let isLogin = checkLogin(req)
    if (isLogin) {
      return isLogin
    }
    let {id} = req.body
    return deleteBlog(id).then((dbData)=>{
      if (dbData.affectedRows === 1) {
        return new SuccessVo('删除成功', true)
      } else {
        return new ErrorVo('删除失败', false)
      }
    })
  }
}


module.exports = handleBlogRouter