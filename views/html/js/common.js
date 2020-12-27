import $ from 'jquery'
import * as api from './api'

function formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}


function parsingCookie() {
  let cookieStr = document.cookie
  let list = cookieStr.split(';')
  let cookie = {}
  list.forEach((item, index) => {
    if (!item) return
    let arr = item.split('=')
    let key = arr[0].trim()
    let value = arr[1].trim()
    cookie[key] = value
  })
  return cookie
}

function checkUserLogined() {
  let cookieUsername = parsingCookie().username
  if (!cookieUsername) {
    return location.href = 'login.html'
  }
}

function generateLogoutMenu() {
  var dom = document.getElementById('username-login')
  let cookieUsername = parsingCookie().username
  // checkUserLogined()
  if (cookieUsername) {
    let username = new Buffer.from(cookieUsername, 'base64').toString()
    dom.innerHTML = '你好 ' + username
    dom.addEventListener('click', function (event) {
      var logoutWrapper = document.getElementsByClassName('logout-wrapper')[0]
      if (logoutWrapper) {
        return
      }
      let { left, top, width, height } = event.target.getBoundingClientRect()
      var scrollY = window.scrollY
      var content = `<ul>
      <span class="popover-arrow"></span>
      <li style="height:36px;display:flex;align-items:center;padding:0 20px;" id="logout-li">退出登录</li>  
      </ul>`
      var div = document.createElement('div')
      div.className = 'logout-wrapper'
      div.innerHTML = content
      div.style.left = left + (width / 2) - 60 + 'px'
      div.style.top = height + 10 + 'px'
      document.body.appendChild(div)
      userLogout()
    })
  }
  else{
    let str = `<a href="login.html" class="ib">
      <div class="user-wrapper" class="ib">
        <svg xmlns="http://www.w3.org/2000/svg"
          style="display: inline-block;vertical-align: top;"
          xmlns:xlink="http://www.w3.org/1999/xlink" class="user-icon" aria-hidden="true">
            <use xlink:href="#icon-yonghu-copy"></use>
          </svg>
        </div >
      </a >`
      dom.innerHTML = str
  }
}
function removeLogoutMenu() {
  document.body.addEventListener('click', function (e) {
    let target = e.target
    var dom = document.getElementById('username-login')
    var logoutLi = document.getElementById('logout-li')
    var logoutDom = document.querySelectorAll('.logout-wrapper')[0]

    //包含点击的元素
    if (logoutDom && !dom.contains(target) && !logoutLi.contains(target)) {
      document.body.removeChild(logoutDom)
    }
  })
}

function setCookie(cookieName, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = cookieName + "=" + escadecodeURIComponentpe(value) + ";expires = " + exdate.toGMTString() + ";path = /";
}

function userLogout() {
  var dom = document.getElementById('logout-li')
  dom.addEventListener('click', function () {
    // setCookie()
    $.ajax({
      method: 'POST',
      url: api.userLogout,
      //允许跨域cookie
      xhrFields: {
        withCredentials: true
      },
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data.code === 200) {
          location.href = 'index.html'
        }
      }
    })
  })
}

// generateLogoutMenu()

// removeLogoutMenu()




export {
  formatDate,
  generateLogoutMenu,
  removeLogoutMenu,
  checkUserLogined,
  parsingCookie
}
