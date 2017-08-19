/**
 * Created by C on 2017/8/15.
 */
$(function (e) {
    getCategoryTitle();
    categoryTitleClick(e);
})

function getCategoryTitle() {
    $.ajax({
        url: url + 'api/getcategorytitle',
        success: function (data) {
            console.log(data.result);
            var html = template('categoryTitleTpl', {data: data.result});
            $('.categoryMenu').html(html);
        }
    })
}
//绑定点击事件
function categoryTitleClick(e){
    $('.categoryMenu').on('click' ,$('.categoryTitle') ,function(){
        //    获取当前点击项的titleId
        var CurentTitleId ;
        if(e.target){
            CurentTitleId = $(e.target).attr('id');
        }else{
            CurentTitleId = parseInt($(window.event.target).attr('id').replace('categoryTitle',''));
        }
        console.log(CurentTitleId);
        //    发送ajax请求，请求响应id的数据
        getCategoryTitleWonList(CurentTitleId);
        //清除其他的样式
        $('.categoryList').hide();
        //给当前点击的Id对应的ul显示
        $('.categoryList'+ CurentTitleId).show();
    } )
}
function getCategoryTitleWonList(CurentTitleId){
    $.ajax({
        url:url+'api/getcategory',
        data:{titleid:CurentTitleId},
        success:function(data){
            console.log(data);
            var html = template('categoryListTpl',{data:data.result})
            $('.categoryList'+CurentTitleId+ ' .row').html(html);
        }
    })
}