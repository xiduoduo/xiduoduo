/**
 * Created by C on 2017/8/16.
 */
$(function () {
    getCategoryTitle();
    bindLiClick();
    //var storage = null;
})

//�첽��Ⱦtitle
function getCategoryTitle() {
    $.ajax({
        url: url + 'api/getcategorytitle',
        success: function (data) {
            console.log(data);
            var html = template('categoryTitleTpl', {data: data.result})
            $('#categoryMenuUU').html(html);
        }
    })
}

//��title�󶨵���¼�
function bindLiClick() {
    $('#categoryMenuUU').on('click', '.categoryTitle', function () {
        var tid = parseInt($(this).attr('titleId'));
        //if(storage.result === undefined){
            //    ��ajax��������content ��ӵ�tid��Ӧ��div��
            $.ajax({
                url: url + 'api/getcategory',//�ӿڵ�ַ
                //type://����ʽ��
                data: {titleid: tid},//���͸���̨������
                //datatype: "jsonp",
              /*  beforeSend:function(){
                    $('.categoryList').hide = null;
                },*/
                complete: function () {
                    $('.categoryList').hide();
                    $('.categoryList' + tid).show();
                },
                success: function (data) {
                    storage = data;
                    console.log(data);
                    var html = template('categoryListTpl', {data: data.result})
                    $(".categoryList" + tid).html(html);
                }
            })
        //}else{
        //    template('id',storage.result)
        //}



    })
}
