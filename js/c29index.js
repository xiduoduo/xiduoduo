/**
 * Created by C on 2017/8/15.
 */
$(function () {
    //首页菜单动态渲染
    getIndexMenu();
    getDissale();
    //绑定点击切换事件
    /*$('#menu .item:nth-child(8)').click(function(){
        console.log(1)
    });*/
    indexMenuToggle();
    B2T();
})
//首页菜单动态渲染
function getIndexMenu( callback ){
    $.ajax({
        url: url + "api/getindexmenu",
        success: function (result) {
            //准备模板
            //绑定数据和模板
            console.log(result);
            var indexMenuHtml = template('indexMenuTpl',result);
            //html
            $('#menu .row').html(indexMenuHtml);
        },
        complete:callback
    })
}
//首页折扣
function getDissale(){
    $.ajax({
        url:url+"api/getmoneyctrl",
        success:function(data){
            var html = template('indexDissaleTpl' , {data:data.result});
            $('#dissale .dissaleList').html(html);
        }
    })
}

function indexMenuToggle(){
    $('#menu .row').on('click' ,$('#menu .row:nth-child(8)'),function(){
        console.log(111111);
        $('#menu .item:nth-last-child(-n +4)').toggle();
        //$("#menu .item:nth-last-child(-n+4)").toggle();
    })
}

function B2T(){
    $('.width40').click(function(){
        $('html body').animate({scrollTop:0} , 200);
        return false;
    })
}

