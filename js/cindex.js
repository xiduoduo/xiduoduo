/**
 * Created by C on 2017/8/14.
 */
//����ҳ�棬�����������ҳ���ʱ���أ���ɺ�̨���ݵ���Ⱦ
$(function () {
    //1��Ⱦ�˵�
    getIndexMenu();
    //2��Ⱦ�ۿ��б�
    //3������ఴť�պ�Ч��
    //4������ض���
})

function getIndexMenu() {
    $.ajax({
        url:"http://182.254.146.100:3000/api/getindexmenu",
        success:function(data){
            console.log(data);
            var indeMenuHtml = template('indexMenuTpl' , data);
            $('.row').html(indeMenuHtml)
        }
    })
}
