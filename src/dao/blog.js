const exec = require('../db/db')

//博客列表
const getList = (author,keyword) =>{
  let sql = `SELECT * FROM blog WHERE 1=1 `
  if(author){
    sql += `AND author='${author}' `
  }
  if(keyword){
    sql += `AND title LIKE '%${keyword}%' `
  }
  sql += `ORDER BY create_time DESC;`
  return exec(sql)
}

//博客详情
const getDetail = (id)=>{
  let sql = `SELECT * FROM blog WHERE id=${id};`
  return exec(sql)
}

//新增博客
const addBlog = (title,content,author='小明') => {
  let time = new Date().getTime()
  let sql = `INSERT INTO blog (title,content,create_time,author) VALUES ('${title}','${content}','${time}','${author}');`
  return exec(sql)
}

//编辑博客
const updateBlog = (id,title,content,author) =>{
  let time = new Date().getTime()
  let sql = `UPDATE blog SET title='${title}',content='${content}',create_time='${time}' WHERE id=${id};`
  return exec(sql)
}

//删除博客
const deleteBlog = (id,author) => {
  let sql = `DELETE FROM blog WHERE id=${id};`
  return exec(sql)
}



module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  deleteBlog
}