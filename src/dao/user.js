const exec = require('../db/db')

//添加用户
const addUser = (username,password,realname) => {
  let sql = "INSERT INTO `user` (username, `password`, realname) VALUES ('"+username+"','"+password+"','"+realname+"');"
  console.log(sql)
  return exec(sql)
}

//用户登录

const userLogin = (username,password) => {
  let sql = "SELECT * FROM `user` WHERE username = '"+username+"' AND `password` = "+password+";"
  return exec(sql).then((row)=>{
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
  editPassword
}