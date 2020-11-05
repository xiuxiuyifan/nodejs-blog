class ResultVo {
  constructor(msg,data){
    if(msg){
      this.msg = msg
    }
    if(data){
      this.data = data
    }
  }
}

class SuccessVo extends ResultVo{
  constructor(msg = '请求成功',data){
    super(msg,data)
    this.code = 200
  }
}

class ErrorVo extends ResultVo{
  constructor(msg = '请求失败',data){
    super(msg,data)
    this.code = 500
  }
} 


module.exports = {
  SuccessVo,
  ErrorVo
}