//获取文章aid
const paramsObj = new URLSearchParams(window.location.search)
const aid = paramsObj.get('aid')

const getArticleDetail = async (req, res) => {
    try {
        const result = await http.get('/api/front/articles/' + aid)
        const article = result.data.data
        // console.log(article);
        document.querySelector('.article-title').innerHTML = article.title
        document.querySelector('.ibox p').innerHTML = article.content
    } catch (err) {
        console.log(err)
    }
}
getArticleDetail()
//评论列表
const loadCommentList = async (req, res) => {
    try {
        const result = await http.get('/api/front/comments/articles/' + aid)
        const commentList = result.data.data
        const divArr = commentList.map(item => {
            return `<div class="social-feed-box">
                      <div class="social-avatar">
                        <a href="javascript:;" class="pull-left">
                          <img alt="image" src="${baseURL + item.reply_user_id.headImgUrl}" />
                        </a>
                        <div class="media-body">
                          <a href="javascript:;"> ${item.reply_user_id.nickname} </a>
                          <small class="text-muted">${item.createdAt}</small>
                        </div>
                      </div>
                      <div class="social-body">
                        <p>${item.content}</p>
                      </div>
                      
                    </div>`
        })
        document.querySelector('.col-lg-12').innerHTML = `<h2>评论：</h2>` + divArr.join('')
    } catch (err) {
        console.log(err)
    }
}
loadCommentList()
//发布评论功能
const sendBtn = document.querySelector('.send-btn')
const sendIpt = document.querySelector('.send-ipt')
sendBtn.onclick = async () => {
    try {
        const result = await http.post('/api/comments', {
            article_id: aid,
            content: sendIpt.value
        })
        console.log(result)
        if (result.data.code === 1) {
            layer.msg('评论成功')
            sendIpt.value = ''
            loadCommentList()
            // window.location.href = '/blog-list.html'
        } else {
            layer.msg('评论失败')
        }
    } catch (e) {
        console.log(e)
    }
}