/**
 *
 * Created by C on 2017/8/12.
 */
//ʹ��zp��ɵ����л���Ч��
//ʹ��ajax����ӿ�������ݿ⶯̬��Ⱦ
    //��Ⱦ������ menu �� discount_list

$(function(){
    //ajax�첽��Ⱦ�˵�����Ȼ������л�Ч��
    getIndexMenu(Menutoggle);

    //��Ⱦ�ۿ۲���
    getIndexDiscount();
})

//1.׼����ҳ�˵�ajax���� ����zp��ajax.js
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
//2.���Ч����zepto��children������������ɸѡ����û��nextAll��������
//˼·����ȡ��ǰ8���������ʱ������е���Ԫ�����dismiss��ʽ������ǰ8���Ƴ�dismiss��ʽ����������ʾ��
//�ŵ㣺���ۺ��涯̬��Ⱦ�˶���Ԫ�أ�ֻ����ǰ8������ʵ�����أ�������װ��������Ⱦ��ʱ����������
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
//3.�ۿ۲��ֶ�̬��Ⱦ
function getIndexDiscount(){
    $.ajax({
        url:url + 'api/getmoneyctrl',
        success:function(result){
            var html = template('discountTpl' , result);
            $('#discount_list_all').html(html);
        }
    })
}