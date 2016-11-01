
// global acess to qst object
function renderBar(options){
    var lebels =[],value=[];
    for(var i=0;i<options.length;i++){
        lebels.push(options[i].field);
        value.push(options[i].value);
    };
    console.log(lebels,value);
    var data = {
    labels: lebels,
    datasets: [
        {
            label: "Votes",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: value,
        }
    ]
};
    var ctx = $("#myChart");
    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options : {
        scales: {
            yAxes: [{
                ticks: {
                    // Create scientific notation labels
                    min : 0
                }
            }]
        }
    }
});
}

$('document').ready(function(){
    renderBar(qst.options);
    $('button').on('click', function(evn){
         var currAns = $('#sel1').val();
         console.log(currAns);
        $.ajax({
            url : '/polls/answer',
            method : 'PUT',
            data : {
                currAns : currAns,
                qst : qst._id
            },
            success : function(data){
                console.log(data);
                renderBar(data.qst.options);
            },
            error : function(err){
                console.log(err);
            }
        });
    });
    
});