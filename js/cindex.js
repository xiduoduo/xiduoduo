/**
 * Created by C on 2017/8/14.
 */
//访问页面，在浏览器加载页面的时候呢，完成后台数据的渲染
$(function () {
    //1渲染菜单
    getIndexMenu();
    //2渲染折扣列表
    //3点击更多按钮闭合效果
    //4点击返回顶部
})

function getIndexMenu() {
    $.ajax({
        url:"http://182.254.146.100:3000/api/getindexmenu",
        success:function(data){
            console.log(data);
            var indeMenuHtml = template('indexMenuTpl' , data);
            $('.row').html(indeMenuHtml)
        }
    })
}
