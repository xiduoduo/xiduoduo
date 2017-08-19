/**
 * Created by C on 2017/8/15.
 */
$(function (e) {
    getCategoryTitle();
    categoryTitleClick(e);
})

function getCategoryTitle() {
    $.ajax({
        url: url + 'api/getcategorytitle',
        success: function (data) {
            console.log(data.result);
            var html = template('categoryTitleTpl', {data: data.result});
            $('.categoryMenu').html(html);
        }
    })
}
//�󶨵���¼�
function categoryTitleClick(e){
    $('.categoryMenu').on('click' ,$('.categoryTitle') ,function(){
        //    ��ȡ��ǰ������titleId
        var CurentTitleId ;
        if(e.target){
            CurentTitleId = $(e.target).attr('id');
        }else{
            CurentTitleId = parseInt($(window.event.target).attr('id').replace('categoryTitle',''));
        }
        console.log(CurentTitleId);
        //    ����ajax����������Ӧid������
        getCategoryTitleWonList(CurentTitleId);
        //�����������ʽ
        $('.categoryList').hide();
        //����ǰ�����Id��Ӧ��ul��ʾ
        $('.categoryList'+ CurentTitleId).show();
    } )
}
function getCategoryTitleWonList(CurentTitleId){
    $.ajax({
        url:url+'api/getcategory',
        data:{titleid:CurentTitleId},
        success:function(data){
            console.log(data);
            var html = template('categoryListTpl',{data:data.result})
            $('.categoryList'+CurentTitleId+ ' .row').html(html);
        }
    })
}