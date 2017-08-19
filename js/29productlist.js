/**
 * Created by C on 2017/8/17.
 */
$(function(){
    var arr = getRequest();
    //默认的页码1
    var pageid = 1;
    //最大的页码
    var maxPageid ;
    getProductTitle(arr);
    getProductList(arr ,pageid ,maxPageid);
})
//功能1：跳转后显示相应分类:铺垫：修改首页的跳转a标签的c29+href
//  修改cate页面点击时的地址栏内容，关联到跳转后的页面上
function getProductTitle(arr){
        var categ =arr['category'];
        console.log(categ);
        $('#productlistIndid').html(categ);
    }
//功能2：渲染产品具体分类
function getProductList(arr , pageid ,maxPageid) {
    var categid = parseInt(arr['categoryid']);
    $.ajax({
        url:url+'api/getproductlist',
        data:{
            "categoryid":categid,
            "pageid": pageid
        },
        success:function(data){
            console.log(data);
            flag = false;
            var proListHtml = template('productlistTpl' ,{data:data.result})
            $('#productlist').html(proListHtml);
            var optionsHtml = '';
            var totaleNumber = Math.ceil(data.totalCount / data.pagesize) - 0;
            for(var i = 0 ; i <totaleNumber ;i++){
                optionsHtml+="<option value="+ (i+1) +">"+ (i+1) +"</option></<br/>"
            }
            $('#productlistSelect').html(optionsHtml);

            //默认选中的option
            $('#productlistSelect option').each(function(i ,item){
                console.log(i+1);
                if( (i+1) == pageid){
                    $(item).attr('selected','selected');
                    return false;
                }
            })
            maxPageid = totaleNumber;
            currentid = pageid
        },
        complete:function(){
            nextClick(arr,pageid,maxPageid);
            prevClick(arr,pageid,maxPageid);
        }
    })

}

//功能3：上一页下一页
//    获取上下按钮点击的时候 select内容change的时候!!!!!!绑定事件的坑！！！！！！！！！

function prevClick(arr,pageid){
    $('#proprev').unbind('click').click(function(){
        if(pageid <= 1){
            pageid=1;
            return false;
        }else{
            pageid--;
            //调用渲染
            getProductList(arr , pageid);
            return false;
        }
        return false;
    })
}
function nextClick(arr,pageid,maxPageid){
    $('#pronext').unbind('click').click(function(){
        if(pageid >= maxPageid){
            pageid=maxPageid;
            return false;
        }else{
            pageid = ++pageid;
            console.log(pageid+'后');

            //调用渲染
            getProductList(arr , pageid,maxPageid)
        }
        return false;
    })
}


//获取地址栏内容
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}