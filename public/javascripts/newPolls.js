$('document').ready(function(){
   console.log('essd');
    $("#new-poll").submit(function(e){
    e.preventDefault();
  });
    $('.submit').on('click',function(){
        var qst = $('#qst').val();
        var options = $('#options').val();
        options = options.split('\n');
        console.log(options.length);
        if(options.length<2)
            $('.warning').text("* please add more options by adding a newline char i.e {enter}");
        else{
            var arr =[];
            for(var i=0;i<options.length;i++)
                arr.push({field:options[i],value:0});
       $.ajax({
           url : '/polls',
           method : 'POST',
           data : {
               question : qst,
               options : arr
           },
           success : function(res){
           console.log(res,"pass");
           var location = 'http://vote8er.herokuapp.com/polls/find/' + res.id;
           window.location.replace(location);
       },
              error : function(err){
           console.log(err);
       }
       });
    }
    });
    
});