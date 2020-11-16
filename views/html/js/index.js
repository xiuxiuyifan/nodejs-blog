import $ from "jquery";
import { formatDate } from './common'

function searchBlog(data){
  $.ajax({
    url: '/api/blog/list',
    data:data,
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


(function(){
  searchBlog()

  $("#search").on('keyup', function (e) {
    if (e.keyCode === 13) {
      let val = $(this).val().trim()
      let params = val ? {keyword:val} : {}
      searchBlog(params)
    }
  })

  $("#search").on('input', function (e) {
    let val = $(this).val().trim()
    let params = val ? { keyword: val } : {}
    searchBlog(params)
  })

}())