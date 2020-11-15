import $ from 'jquery'

class Login {
  constructor(props){
  }

  init(){
    this.loginHanlder()
  }

  loginHanlder(){
    $("#login").on('click',function (e) {
      e.preventDefault()
      let userName = $('#username').val()
      let password = $('#password').val()

      $.ajax({
        method: 'POST',
        url: '/api/user/login',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          username: userName,
          password
        }),
        success: function (data) {

        }
      })
    })
  }


}

var login = new Login()

login.init()