
$(document).ajaxComplete(function(){
    if($('h3').length != 0) {
        $('h3').css('margin-left', '400px');
        //$('h3').css('margin', 'auto');
    }

    if($('#Basement').length!=0){
        $('#Basement').css('white-space', 'nowrap');

    }
    if($('#room').length!=0){
        //$('#room').css('margin', '0 100 0 100');
         $('#room').css('display', 'inline');
         $('#room').css('margin-right', '600px');
         $('#room').css('margin-left', '350px');

    }

     if($('.curr_room').length!=0){
        //$('#room').css('margin', '0 100 0 100');
         $('.curr_room').css('margin-left', '250px');
         $('.curr_room').css('margin-right', '700px');

    }



});

function fetch_floor_rooms(floor, element){
    //alert("YO");
    //console.log("HELLO");

    $.ajax({
            type: "Post",
            url: "room_reservation_display.php",
            //dataType: "json",
            success: function(responseData, status){

                //console.log("HELLO");
                responseData = JSON.parse(responseData);
                console.log(responseData);
                //console.log(responseData['Floors']);
                var output = "<br/>";
                output+="<br/>";
                output+="<br/>";
                output+="<table style = 'width: 100%'>";
                output+="<tr>";
               // output+="<h3 id = 'room'>Room ID   &nbsp; &nbsp; &nbsp; Number of Chairs   &nbsp; &nbsp; &nbsp;   Size</h3>";
                output+="<th> Room ID </th>";
                output+="<th> Number of Chairs </th>";
                output+="<th> Size </th>";
                output+="</tr>";

                //output += "<span>";  

                   // $.each(responseData.Floors, function(i, item) {
                        //console.log("HELLO");
                        var curr_floor = [];
                        if(floor === "Basement"){
                            curr_floor = responseData["Floors"][0];
                        }
                        else if(floor === "First"){
                            curr_floor = responseData["Floors"][1];
                        }
                        else if(floor === "Second"){
                            curr_floor = responseData["Floors"][2];
                        }
                        else if(floor === "Third"){
                            curr_floor = responseData["Floors"][3];
                        }

                        console.log(curr_floor);
                        //output += "<p>" + floor + "</p>";
                        output += "<br/>";
                        for(var i = 0; i < curr_floor.length; ++i){
                            var curr_room = curr_floor[i];
                            output+="<tr>";
                            output+="<td>" + curr_room[0] + "</td>";
                            output+="<td>" + curr_room[1] + "</td>";
                            output+="<td>" + curr_room[2] + "</td>";
                            //output+="<p class= 'curr_room'>";
                            //output+= curr_room[0];
                            //output+= "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+curr_room[1];
                            //output+= "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+curr_room[2];
                            //output+="</p>";
                            output+="</tr>"
                            //output+="<br/>";
                        }
                      
                   // });
                 output += "</table>";
                //console.log(output);
                $(output).appendTo(document.getElementById(floor));
               

            },error: function(msg) {
                    // there was a problem
                alert("There was a problem: " + msg.status + " " + msg.statusText);
            }
    });
}


function openTab(floor,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(floor).style.display = "block";
    $("#floor").slideDown();

    elmnt.style.backgroundColor = color;
    if(!document.getElementById(floor).firstElementChild){
        fetch_floor_rooms(floor, elmnt);
    }

}

$(document).ready(function() {
// Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

});