let reqUrl = 'http://localhost:8080'

const blogList = reqUrl + '/api/blog/list'
const userLogin = reqUrl + '/api/user/login'
const userLogout = reqUrl + '/api/user/logout'
const blogDetail = reqUrl + '/api/blog/detail'
const userAdd = reqUrl + '/api/user/add'
const addBlog = reqUrl + '/api/blog/add'

export {
  blogList,
  userLogin,
  userLogout,
  blogDetail,
  userAdd,
  addBlog
}