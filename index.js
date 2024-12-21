let pagenum = 1
const pagesize = 2
const loadList = async (req, res) => {
  const result = await http.get('/api/front/articles', { params: { pagenum, pagesize } })
  // console.log(result);
  const articlesArr = result.data.data
  const liArr = articlesArr.map((item) => {
    return `<div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-content">
              <a href="detail.html?aid=${item._id}" class="btn-link">
                <h2>
                  ${item.title}
                </h2>
              </a>
              <div class="small m-b-xs">
                <strong>${item.author ? item.author.nickname : '匿名'}</strong>
                <span class="text-muted"
                  ><i class="fa fa-clock-o"></i> ${item.createdAt}
                </span>
              </div>
              <p>
                ${item.content}
              </p>
              <div class="row">
                <div class="col-md-1"><i class="fa fa-eye"> </i> ${item.views} 浏览</div>
                <div class="col-md-1">
                  <i class="fa fa-comments-o"> </i> ${item.coms.length} 评论
                </div>
                
              </div>
            </div>
          </div>
        </div>`
  })
  const liStr = liArr.join('')
  document.querySelector('.row').innerHTML += liStr

}

loadList()

//加载更多
const loadMoreBtn = document.querySelector('.pager a')
const loadMore = async () => {
  console.log('加载更多');
  pagenum++
  await loadList()

}
loadMoreBtn.addEventListener('click', loadMore)
