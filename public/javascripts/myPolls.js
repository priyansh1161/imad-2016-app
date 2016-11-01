$('document').ready(function(){
    $('.delete').on('click',function(){
        var qstId = $(this).siblings()[0];
        var arr = qstId.href.split('/')
        console.log(arr[arr.length-1]);
        $.ajax({
            url : '/polls/delete',
            method : 'DELETE',
            data : {
                _id : arr[arr.length-1]

            },
            success: function(res){
                $(this).parent().hide();
                console.log(res);
            },
            error: function(xhr){
                console.log(xhr);
            }
        })

    });
});