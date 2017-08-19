$(function() {
    // 获取分类标题
    getCategoryTitle()






})

// 获取分类标题
function getCategoryTitle() {
    $.ajax({
        url: "http://182.254.146.100:3000/api/getcategorytitle",
        success: function(info) {
            console.log(info)

            var html = template("categoryTitlTpl", info);
            $("#category-title .panel-group").html(html)
                //  点击获取到相应的title Id

            $("#category-title .panel-heading a").on('click', function() {
                // console.log($(this).attr("data-title"))
                var titleid = $(this).attr("data-title");
                var $that = $(this);
                $.ajax({
                    url: "http://182.254.146.100:3000/api/getcategory?titleid=" + titleid,
                    success: function(data) {
                        // console.log(data)
                        var html = template("categoryProductTpl", data);
                        var $ul = $that.parent().parent().parent().find(".panel-collapse").find(".panel-body").find("ul");
                        $ul.html(html)
                        var length = $ul.children().length;
                        // 获取最后一行的子元素个数
                        var lastChildlength = length % 3 || 3;
                        $ul.children("li:nth-last-child(-n+" + lastChildlength + ")").css("border-bottom", 0)
                    }
                })

            })
        }
    })
}