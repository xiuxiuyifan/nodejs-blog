import $ from "jquery";
import { formatDate } from './common'


$.ajax({
  url: '/api/blog/list',
  success: (data) => {
    let str = ``
    data.data.forEach(item => {
      str += `<li class="article-li">
                <a href="details.html?author=${item.author}"><div class="article-user"><span class="article-username">${item.author}</span><span>${formatDate(item.create_time)}</span></div></a>
                <a href="details.html"><div class="title-article">${item.title}</div></a>
                <a href="details.html">
                  <div class="title-description">
                    ${item.content}
                  </div>
                </a>
              </li>`
    });

    $("#article-box").html(str)
  }
})