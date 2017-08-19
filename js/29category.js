/**
 * Created by C on 2017/8/14.
 */
$(function () {
    //��Ⱦtitle
    getCategoryTitle();
})
//��װajax����̬��Ⱦҳ��ṹ
function getCategoryTitle() {
    $.ajax({
        url: url2 + 'api/getcategorytitle',
        success: function (result) {
            var titleHtml = template('categoryMenuTitleTpl', result);
            $('.category_top').append(titleHtml);
        },
        complete: function () {
            //    ����ɺ����л�ȡtitle����
            var titleDoms = $('.category_top .category_title');
            //  ��ȡtitle������ÿ��titleƽ�е�list
            var contentDoms = $('.category_list');
            var tId;
            titleDoms.each(function (i, item) {
                $(item).on('click', function () {
                    //�ɵ�������
                    contentDoms.each(function (i, item) {
                        $(item).hide();
                    })
                    tId = $(this).attr('titleId');
                    //���title��ȡtitle��titleId����������Ⱦָ��id������
                    getCategoryContent(tId);
                    //�����Ķ���Ч��
                    $(this).next('div').show();
                })
            })

        }
    })
}
//�����ȡtitleid��������������������
function getCategoryContent(tId) {
    var tId = tId;
    $.ajax({
        url: url2 + 'api/getcategory',
        data: {'titleid': tId},
        success: function (result) {
            //console.log(result);
            var contentHtml = template('categoryMenuContent', result);
            $('#' + tId).html(contentHtml);
            console.log(contentHtml);
        }
    })
}

