import $ from 'jquery'
import * as api from './api'
import { parsingCookie } from './common'

class Login {
  constructor(props) {
  }

  init() {
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
  loginHanlder() {
    $("#login").on('click', function (e) {
      e.preventDefault()
      let userName = $('#username').val().trim()
      let password = $('#password').val().trim()
      if (!username) {
        return alert('用户名不能为空！')
      }
      if (!password) {
        return alert('密码不能为空!')
      }
      $.ajax({
        method: 'POST',
        url: api.userLogin,
        //允许跨域cookie
        xhrFields: {
          withCredentials: true,
        },
        // headers: {      //请求头
        //   'xxxxxx': '777777',
        // },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          username: userName,
          password
        }),
        success: function (data) {
          if (data.code === 200) {
            location.href = 'index.html'
          }else{
            alert(data.msg)
          }
        }
      })
    })
  }

  bindingClick() {
    $('.login-tab').each(function (index) {
      $(this).on('click', function () {
        $('.login-tab').each(function () {
          $(this).removeClass('active')
        })
        $(this).addClass('active')
        $('.login-form').each(function () {
          $(this).removeClass('login-form-active')
        })
        $($('.login-form')[index]).addClass('login-form-active')
      })
    })

    $('#regist').on('click', function (e) {
      e.preventDefault()
      let userName = $('#username-regist').val().trim()
      let realName = $('#realname-regist').val().trim()
      let password = $('#password-regist').val().trim()
      if (!username) {
        return alert('用户名不能为空！')
      }
      if (!realName) {
        return alert('真实姓名不能为空！')
      }
      if (!password) {
        return alert('密码不能为空!')
      }
      $.ajax({
        method: 'POST',
        url: api.userAdd,
        //允许跨域cookie
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          username: userName,
          realname: realName,
          password: password
        }),
        success: function (data) {
          alert(data.msg)
          if (data.code === 200) {
            location.href = 'login.html'
          }
        }
      })
    })
  }
}

var login = new Login()

login.init()