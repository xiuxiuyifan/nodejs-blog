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
      let userName = $('#username').val().trim()
      let password = $('#password').val().trim()

      $.ajax({
        method: 'POST',
        url: '/api/user/login',
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


}

var login = new Login()

login.init()