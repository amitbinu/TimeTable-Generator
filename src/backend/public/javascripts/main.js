
window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
        // Handle page restore.
        console.log("RECALLING");
        $.ajax({
            url: '/check/showCourses',
            type:"GET",
            async: true,
            cache: false
        }).done(function (result) {
            $('#output').html(result);
        });
    }
});



$(document).ready(function () {
    var allCourses = [];
    selectedCourses = [];
    

    $('#add').click(function () {
        var value = $('#input').val();
        if (value === ''){
            $('#error').html("Please enter a course code");
            $('#input').effect('shake');
        }
        else{
            $('#error').html(" ");
            if (selectedCourses.indexOf(value) >= 0) {
                $("#error").html("You already chose this course");
                    $('#input').effect('shake');
                    return;
            }

            if(allCourses.indexOf(value) < 0){
                $("#error").html("Invalid course");
                    $('#input').effect('shake');
                    return;
            }
            selectedCourses.push(value);
            var result = "<ul>";
            for (var i = 0 ; i < selectedCourses.length; i++){
                result += "<li class='course " + selectedCourses[i] + "' > <button type='button' class='remove btn btn-danger' value='" + selectedCourses[i] + "'>Remove </button>"+ selectedCourses[i]  +"</li>"
            }
            result += "</ul>"
            $('#output').html(result);
            $('.remove').click(function () {
		        var className = '.' + ($(this).val());
		        selectedCourses.splice(selectedCourses.indexOf(className),1);
		        $(className).remove();
   			});
        }

    });

     

    $.ajax({
        url:'/getlink',
        type:"POST"
    }).done(function (result) {
        allCourses = result;
        $("#input").autocomplete({ maxShowItems:10,source:result, minLength:4, delay:0});
    });

    $("#generate").click(function () {
        console.log("clicked generate ");

       $.ajax({
            url: '/check/submit/'+selectedCourses,
            type: "POST",
           async: true,
           cache:false
        }).done(function (result) {
            if(result === 'error'){
                $('#error').html("Please ADD a course code");
                $('#input').effect('shake');
            }
            else{
                window.location = "/generateTimeTable";
            }

        });

    });

});


