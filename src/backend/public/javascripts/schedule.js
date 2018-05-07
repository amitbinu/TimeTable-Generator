$(document).ready(function () {

    $.ajax({
        url:'/generateTimeTable/getSchedule',
        type:"GET"
    }).done(function (result) {
        putCourses(result)
    });
    var colors=[];
    var courses=[];
    function randomColor() {
        var back = ["#a0c4ff","#ffa0ff","#ffa0a0","#c6c4c4","#fff8ba","#a7f99f","#bafff8","#bebaff","#ffca96"];
        return back[Math.floor(Math.random() * back.length)];
    }

    $("#generate2").click(function () {
        $.ajax({
            url:'/generateTimeTable/newTable',
            type:"GET"
        }).done(function (result) {
            $("#schedule1").html(result);
            $.ajax({
                url:'/generateTimeTable/makeAgain1',
                type:"GET"
            }).done(function (result) {
                putCourses(result);

            });
        });
    });

    $("#generate3").click(function () {
        $.ajax({
            url:'/generateTimeTable/newTable',
            type:"GET"
        }).done(function (result) {
            $("#schedule2").html(result);
            $.ajax({
                url:'/generateTimeTable/makeAgain2',
                type:"GET"
            }).done(function (result) {
                putCourses(result);

            });
        });
    });
    var reset = [];
    
    function reset() {
        for(var i = 0; i < reset.length; i++){

        }
    }
    function putCourses(schedule) {
        var counter = 1;
        schedule.forEach(function (version) {
            colors=[];
            courses=[];
            version.forEach(function (day) {
                day.forEach(function (core) {
                    var startTime = core.start+'';
                    startTime = startTime.replace('.','');
                    var endTime= core.end;
                    var rowspan = Math.round((core.end-core.start+0.3)/0.5);
                    var day = core.day-1;


                    var name = core.name;
                    var code = core.name.split(' ');
                    code= code[0];
                    var color;
                    console.log('Name -- ' + name + ' -- ' +core.start + ' - ' + core.end + ' - ' + day);
                    if (courses.indexOf(code) < 0){
                        //make a randomColor;

                        color = randomColor();
                        while(colors.indexOf(color) >=0 ){
                            color = randomColor();
                        }
                        colors.push(color);
                        courses.push(code);
                    }
                    else{
                        var index = courses.indexOf(code);
                        color= colors[index];
                    }
                    var cell = $("#schedule"+counter+' .time'+startTime + " .day" +day);


                    for(var start= core.start+0.5; start <= endTime; start += 0.5){
                        var temp = start+'';
                        temp = temp.replace('.','');
                        $("#schedule"+counter+' .time'+temp + " .day" +day).remove();
                    }
                    cell.draggable({
                        revert:  function(dropped) {
                            var $draggable = $(this),
                                hasBeenDroppedBefore = $draggable.data('hasBeenDropped'),
                                wasJustDropped = dropped && dropped[0].id == "droppable";
                            if(wasJustDropped) {
                                // don't revert, it's in the droppable
                                return false;
                            } else {
                                if (hasBeenDroppedBefore) {
                                    // don't rely on the built in revert, do it yourself
                                    $draggable.animate({ top: 0, left: 0 }, 'slow');
                                    return false;
                                } else {
                                    // just let the built in revert work, although really, you could animate to 0,0 here as well
                                    return true;
                                }
                            }
                        }
                    });
                    cell.attr('rowspan',rowspan);
                   cell.html(name+'<br>'+core.room+'<br>'+core.supervisor);
                   cell.css('background',color);
                  /* cell.draggable({
                       addClasses:true
                   });*/
                })
            });
            counter++;
        });
     //   $("#schedule"+1+' .time'+15 + " .day" +0).remove();
    }
});