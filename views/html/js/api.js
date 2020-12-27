let reqUrl = 'http://localhost:8080'

const blogList = reqUrl + '/api/blog/list'
const userLogin = reqUrl + '/api/user/login'
const userLogout = reqUrl + '/api/user/logout'
const blogDetail = reqUrl + '/api/blog/detail'

export {
  blogList,
  userLogin,
  userLogout,
  blogDetail
}