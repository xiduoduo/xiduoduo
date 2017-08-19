$(function() {


    // GetQueryString(category)
    // console.log(GetQueryString("categoryid"))
    var categoryid = GetQueryString("categoryid");
    // 获取路径导航中的动态数据
    getPathDate(categoryid)
        //  根据分类ID  获取商品列表信息  
    var pageid = GetQueryString("pageid");
    console.log(pageid)
    getProductListById(categoryid, pageid)
})


// 采用正则表达式获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 获取路径导航中的动态数据

function getPathDate(categoryid) {
    $.ajax({
        url: "http://182.254.146.100:3000/api/getcategorybyid?categoryid=" + categoryid,
        success: function(data) {
            // console.log(data.result[0].category)
            $("#productlist .productlist-title li:eq(2)").html(data.result[0].category)
        }
    })
}

//  根据分类ID  获取商品列表信息
function getProductListById(categoryid, pageid) {
    // 容错判断   默认值为1 
    pageid = parseInt(pageid || 1);
    $.ajax({
        url: "http://182.254.146.100:3000/api/getproductlist",

        data: {
            "categoryid": categoryid,
            "pageid": pageid
        },
        success: function(data) {
            console.log(data)
            var html = template("ProductListById", data);
            $("#productlist .productlist-content").html(html)
                // 获取总页数  - 0 转化为数字  parseInt 也可以
            var totaleNumber = Math.ceil(data.totalCount / data.pagesize) - 0;
            // console.log(totaleNumber);
            var totaleData = "";

            for (var i = 0; i < totaleNumber; i++) {
                totaleData += `
                 <li> <a href = "./productlist.html?categoryid=${categoryid}&pageid=${i+1}" > 第${i+1}页 </a></li>
                `

            }
            $("#productlist .productlist-page .dropdown-menu").html(totaleData)
                //  对pageid  进行简单的判断
            if (pageid < 1) {
                pageid = 2
            }
            if (pageid >= 　totaleNumber　) {
                pageid = 　totaleNumber　 - 1
            }
            pageid = 2
                // 根据获取到的pageid 值  更改a 中的链接href
            var urlNext = `./productlist.html?categoryid=${categoryid}&pageid=${pageid + 1 }`;
            var urlprev = `./productlist.html?categoryid=${categoryid}&pageid=${pageid - 1 }`;

            $(".productlist-page-previous a").attr("href", urlprev)
            $(".productlist-page-next a").attr("href", urlNext)
        }
    })
}