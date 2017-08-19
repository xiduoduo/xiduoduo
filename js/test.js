/**
 * Created by C on 2017/8/17.
 */
$(function(){
    $.ajax({
        url:url+'api/getcategorybyid',
        data:{"categoryid":1,
                "getproductlist":1
            },
        success:function(data){
            console.log(data);
        }
    })
})