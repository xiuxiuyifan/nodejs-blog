import $ from 'jquery'
import { formatDate } from './common'
(function () {
  function getDetails(data) {
    $.ajax({
      url: '/api/blog/detail',
      data: data,
      success: (data) => {
        let { title, content, author, create_time } = data.data
        $('#details-title').html(title)
        $('#details-content').html(content)
        $('#user').html(author)
        $('#time').html(formatDate(create_time))
      }
    })
  }

  function getUserBlogList(data) {
    $.ajax({
      url: '/api/blog/list',
      data: data,
      success: (data) => {
        let str = ``
        data.data.forEach(item => {
          str += `<li class="article-li">
                <a href="details.html?author=${item.author}"><div class="article-user"><span class="article-username">${item.author}</span><span>${formatDate(item.create_time)}</span></div></a>
                <a href="details.html?id=${item.id}"><div class="title-article">${item.title}</div></a>
                <a href="details.html?id=${item.id}">
                  <div class="title-description">
                    ${item.content}
                  </div>
                </a>
              </li>`
        });

        $("#article-box").html(str)
      }
    })
  }



  function getUrlParams(key) {
  let href = location.href
  let paramsStr = href.substr(href.indexOf('?') + 1)
  let arr = paramsStr.split('&')
  let paramsObj = {}
  arr.forEach((item) => {
    let itemArr = item.split('=')
    paramsObj[itemArr[0]] = itemArr[1]
  })
  return paramsObj[key]
}

function init() {
  let id = getUrlParams('id')
  let author = getUrlParams('author')
  if(id){
    getDetails({id:id})
    return
  }
  if(author){
    getUserBlogList({author:author})
    return
  }
}


init()
}())