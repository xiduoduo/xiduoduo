/**
 * Created by C on 2017/8/18.
 */
$(function(){
//    1cateҳ��תʱ�������ݴ�����Ʒ�б�ҳ
    console.log(getRequest());
    var arr = getRequest();
    var plisttitle = arr['category'];
    var plisttitleid = arr['categoryid']

    var pageid = 1;
    var totalSize = 10000;
    console.log(plisttitleid);

    $('#plisttitle').html(plisttitle);
//    2��Ⱦplist
    getplist(plisttitleid , pageid ,totalSize);


//    3
})






function getplist(plisttitleid,pageid,totalSize){
    $.ajax({
        url:url+'api/getproductlist',
        data:{
            "categoryid":plisttitleid,
            "pageid":pageid
        },
        success:function(data){
            console.log(data);
            var plisthtml = template('productlistTpl',{data:data.result})
            $('#productContent').html(plisthtml);
            totalSize = Math.ceil(data.totalCount/data.pagesize)
            var str="";

            for(var i = 1 ; i <= totalSize ; i++){
                str+=' <option value='+ i +'>' + i + '</option><br/>';
            }
            $("#productListSelect").html(str)

            $('#productListSelect option').each(function(i,item){
                if((i+1) === pageid){
                    $(item).attr('selected','selected');
                }
            })
        },
        complete:function(){
            //$("#btnPre").click = null;
            $("#btnPre").unbind('click').click(function(){
                if(pageid === 1)return false;
                pageid--;
                console.log(pageid);
                getplist(plisttitleid,pageid);
            })
            $("#btnNext").unbind('click').click(function(){
                if(pageid === totalSize)return false;
                pageid++;
                console.log(pageid);
                getplist(plisttitleid,pageid);
            })
        }
    })
}

//



//��ȡ��ַ������
function getRequest() {
    var url = window.location.search; //��ȡurl��"?"������ִ�
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            //������������
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //֮ǰ����unescape()
            //�Ż��������
        }
    }
    return theRequest;

    /*
     function GetQueryString(name)
     {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
     }*/
}
//http://www.cnblogs.com/fishtreeyu/archive/2011/02/27/1966178.html
//http://blog.csdn.net/bulongwind/article/details/62423198