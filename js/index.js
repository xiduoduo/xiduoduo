$(function() {

    // 首页menu  部分
    getIndexMenu()

    //  on   动态绑定
    $("#menu ").on("click", ".item:nth-child(8)", function() {
        $("#menu .item:nth-last-child(-n+4)").toggle()
    })

    //   获取主页商品折扣列表
    getDiscountProduct();

})

function getIndexMenu() {
    $.ajax({
        url: url + "api/getindexmenu",
        success: function(data) {
            //    data  键值对形式
            var html = template("indexMenuTpl", data);
            $("#menu").html(html)
        }
    })
}

function getDiscountProduct() {
    $.ajax({
        url: url + "api/getmoneyctrl",
        success: function(data) {
            //    data  键值对形式
            var html = template("indexDiscountTpl", data);
            $("#discount .discount-product").html(html)
        }
    })
}