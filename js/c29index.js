/**
 * Created by C on 2017/8/15.
 */
$(function () {
    //��ҳ�˵���̬��Ⱦ
    getIndexMenu();
    getDissale();
    //�󶨵���л��¼�
    /*$('#menu .item:nth-child(8)').click(function(){
        console.log(1)
    });*/
    indexMenuToggle();
    B2T();
})
//��ҳ�˵���̬��Ⱦ
function getIndexMenu( callback ){
    $.ajax({
        url: url + "api/getindexmenu",
        success: function (result) {
            //׼��ģ��
            //�����ݺ�ģ��
            console.log(result);
            var indexMenuHtml = template('indexMenuTpl',result);
            //html
            $('#menu .row').html(indexMenuHtml);
        },
        complete:callback
    })
}
//��ҳ�ۿ�
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

