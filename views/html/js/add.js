import $ from 'jquery'
import { checkUserLogined, generateLogoutMenu } from './common' 

!(function(){
  var add = {
    init:function(){
      generateLogoutMenu()
      this.inputTitleHanlder()
      this.issueHanlder()
    },
    inputTitleHanlder:function(){
      $('#title').on('input',function(e){
        let len = $(this).val().length
        if(len>0){
          $('#issue').addClass('issue-active')
        }else{
          $('#issue').removeClass('issue-active')
        }
      })
    },
    issueHanlder:function(){
      $("#issue").on('click',function (e) {
        let title = $("#title").val()
        let content = $("#content").val()
        $.ajax({
          method: 'POST',
          url: '/api/blog/add',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({
            title,
            content
          }),
          success: function (data) {
            if(data.code === 200){
              location.href = 'index.html'
            }else{
              alert(data.msg)
              location.href = 'login.html'
            }
          }
        })
      })
    }
  }
  checkUserLogined()
  add.init()
})()