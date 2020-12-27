import $ from 'jquery'
import * as api from './api'
import { parsingCookie } from './common'

class Login {
  constructor(props){
  }

  init(){
    this.loginHanlder()
    this.checkUserLogined()
    this.bindingClick()
  }
  checkUserLogined() {
  let cookieUsername = parsingCookie().username
  if (cookieUsername) {
    return location.href = 'index.html'
  }
}
  loginHanlder(){
    $("#login").on('click',function (e) {
      e.preventDefault()
      let userName = $('#username').val().trim()
      let password = $('#password').val().trim()

      $.ajax({
        method: 'POST',
        url: api.userLogin,
        //允许跨域cookie
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          username: userName,
          password
        }),
        success: function (data) {
          if(data.code === 200){
            location.href = 'index.html'
          }
        }
      })
    })
  }

  bindingClick(){
    $('.login-tab').each(function(index){
      $(this).on('click',function(){
        $('.login-tab').each(function () {
          $(this).removeClass('active')
        })
        $(this).addClass('active')
        $('.login-form').each(function(){
          $(this).removeClass('login-form-active')
        })
        $($('.login-form')[index]).addClass('login-form-active')
      })
    })
  }
}

var login = new Login()

login.init()