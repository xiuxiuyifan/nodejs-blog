function generateLogoutMenu() {
  var dom = document.getElementById('username-login')
  dom.addEventListener('click', function (event) {
    var logoutWrapper = document.getElementsByClassName('logout-wrapper')[0]
    if(logoutWrapper){
      return
    }
    let { left, top, width, height } = event.target.getBoundingClientRect()
    var scrollY = window.scrollY
    console.log(scrollY)
    var content = `<ul>
      <span class="popover-arrow"></span>
      <li style="height:36px;display:flex;align-items:center;padding:0 20px;" id="logout-li">退出登录</li>  
      </ul>`
    var div = document.createElement('div')
    div.className = 'logout-wrapper'
    div.innerHTML = content
    div.style.left = left + (width / 2) - 60 + 'px'
    div.style.top = height + 10  + 'px'
    document.body.appendChild(div)
    userLogout()
  })
}
function removeLogoutMenu(){
  document.body.addEventListener('click',function(e){
    let target =  e.target
    var dom = document.getElementById('username-login')
    var logoutLi = document.getElementById('logout-li')
    //包含点击的元素
    if (!dom.contains(target) && !logoutLi.contains(target)){
      var logoutDom = document.querySelectorAll('.logout-wrapper')[0]
      document.body.removeChild(logoutDom)
    }
  })
}

function userLogout(){
  var dom = document.getElementById('logout-li')
  dom.addEventListener('click',function(){
    document.cookie = ''
    location.href = 'login.html'
  })
}

generateLogoutMenu()

removeLogoutMenu()


