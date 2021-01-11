const exec = require('../db/db')

//检查用户名是否被注册
const checkUsernameUnique = (username) => {
  let sql = "SELECT `username` FROM `user` 	WHERE 	username = '"+username+"';"
  return exec(sql)
}

//添加用户
const addUser = (username,password,realname) => {
  let sql = "INSERT INTO `user` (username, `password`, realname) VALUES ('"+username+"','"+password+"','"+realname+"');"
  console.log(sql)
  return exec(sql)
}

//用户登录
const userLogin = (username,password) => {
  let sql = "SELECT * FROM `user` WHERE username = '"+username+"' AND `password` = "+password+";"
  console.log(sql)
  return exec(sql).then((row)=>{
    console.log(row)
    if(row.length>0){
      return row[0]
    }else{
      return {}
    }
  })
}

//修改密码
const editPassword = () => {

}


module.exports = {
  userLogin,
  addUser,
  editPassword,
  checkUsernameUnique
}