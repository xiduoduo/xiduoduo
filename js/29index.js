/**
 *
 * Created by C on 2017/8/12.
 */
//使用zp完成电视切换特效，
//使用ajax请求接口完成数据库动态渲染
    //渲染部分有 menu 和 discount_list

$(function(){
    //ajax异步渲染菜单栏：然后调用切换效果
    getIndexMenu(Menutoggle);

    //渲染折扣部分
    getIndexDiscount();
})

//1.准备首页菜单ajax函数 引入zp的ajax.js
function getIndexMenu(callback){
    $.ajax({
        url: url2+'api/getindexmenu',

        success:function(data){
            console.log(data);
            var html = template('indexMenuTpl' , {data : data.result});
            $('#menu .row').html(html);
        },
        complete:callback
    })
}
//2.点击效果：zepto的children方法可以批量筛选，并没有nextAll（）方法
//思路：获取到前8个，点击的时候给所有的子元素添加dismiss样式，并给前8个移除dismiss样式，让他们显示，
//优点：无论后面动态渲染了多少元素，只操作前8个的现实和隐藏，在配合米板引擎的渲染的时候工作量减少
function Menutoggle(){
    var toggleFlag = 1;
    $("#580831702bcccb2c22ed4779").on("click",  function() {
        //console.log($("#menu .row").children('*:nth-child(-n + 8)'));
        toggleFlag++;
        if(toggleFlag%2 === 0){
            $("#menu .row").children().addClass('dismiss');
            $("#menu .row").children('*:nth-child(-n + 8)').removeClass('dismiss');
        }else{
            $("#menu .row").children().removeClass('dismiss');
        }
    })
}
//3.折扣部分动态渲染
function getIndexDiscount(){
    $.ajax({
        url:url + 'api/getmoneyctrl',
        success:function(result){
            var html = template('discountTpl' , result);
            $('#discount_list_all').html(html);
        }
    })
}