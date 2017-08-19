/**
 * Created by C on 2017/8/14.
 */
$(function () {
    //渲染title
    getCategoryTitle();
})
//封装ajax请求动态渲染页面结构
function getCategoryTitle() {
    $.ajax({
        url: url2 + 'api/getcategorytitle',
        success: function (result) {
            var titleHtml = template('categoryMenuTitleTpl', result);
            $('.category_top').append(titleHtml);
        },
        complete: function () {
            //    在完成函数中获取title数组
            var titleDoms = $('.category_top .category_title');
            //  获取title数组中每个title平行的list
            var contentDoms = $('.category_list');
            var tId;
            titleDoms.each(function (i, item) {
                $(item).on('click', function () {
                    //干掉所有人
                    contentDoms.each(function (i, item) {
                        $(item).hide();
                    })
                    tId = $(this).attr('titleId');
                    //点击title获取title的titleId发送请求渲染指定id的内容
                    getCategoryContent(tId);
                    //点击后的动画效果
                    $(this).next('div').show();
                })
            })

        }
    })
}
//点击获取titleid，传入请求函数中拿数据
function getCategoryContent(tId) {
    var tId = tId;
    $.ajax({
        url: url2 + 'api/getcategory',
        data: {'titleid': tId},
        success: function (result) {
            //console.log(result);
            var contentHtml = template('categoryMenuContent', result);
            $('#' + tId).html(contentHtml);
            console.log(contentHtml);
        }
    })
}

