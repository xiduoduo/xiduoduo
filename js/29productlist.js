/**
 * Created by C on 2017/8/17.
 */
$(function(){
    var arr = getRequest();
    //Ĭ�ϵ�ҳ��1
    var pageid = 1;
    //����ҳ��
    var maxPageid ;
    getProductTitle(arr);
    getProductList(arr ,pageid ,maxPageid);
})
//����1����ת����ʾ��Ӧ����:�̵棺�޸���ҳ����תa��ǩ��c29+href
//  �޸�cateҳ����ʱ�ĵ�ַ�����ݣ���������ת���ҳ����
function getProductTitle(arr){
        var categ =arr['category'];
        console.log(categ);
        $('#productlistIndid').html(categ);
    }
//����2����Ⱦ��Ʒ�������
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

            //Ĭ��ѡ�е�option
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

//����3����һҳ��һҳ
//    ��ȡ���°�ť�����ʱ�� select����change��ʱ��!!!!!!���¼��Ŀӣ�����������������

function prevClick(arr,pageid){
    $('#proprev').unbind('click').click(function(){
        if(pageid <= 1){
            pageid=1;
            return false;
        }else{
            pageid--;
            //������Ⱦ
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
            console.log(pageid+'��');

            //������Ⱦ
            getProductList(arr , pageid,maxPageid)
        }
        return false;
    })
}


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
}