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

                 var curr_table;
                if(floor === "Basement"){
                   curr_table =  "<table style = 'width: 100%' id = 'BasementBasement'>";
                }
                else if(floor === "First"){
                   curr_table =  "<table style = 'width: 100%' id = 'FirstFirst'>";
                }
                else if(floor === "Second"){
                    curr_table =  "<table style = 'width: 100%' id = 'SecondSecond'>";
                }
                else if(floor === "Third"){
                    curr_table =  "<table style = 'width: 100%' id = 'ThirdThird'>";
                }


                
                console.log(curr_table);
                output+=curr_table;
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

                            //var btn = document.createElement("BUTTON");
                            //btn.setAttribute("id", curr_room[0]);
                           // btn.setAttribute("class","roomBtn");
                            //btn.innerHTML = ""+curr_room[0];
                            //btn.click(function() {onClick(curr_room)});
                            //floor.appendChild(btn);

                            //btn.onclick = function() { btnClick(this.id); };

                            output+="<td> <button id = " + curr_room[0]+ " class = roomBtn> " +  curr_room[0] + " </button> </td>";
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

// function color_rooms(element, roomID){
//   $.ajax({
//     type: "Post",
//             url: "reservation_status.php",
//             //dataType: "json",
//             success: function(responseData, status){

//               var room = document.getElementById(roomID);

//               responseData = JSON.parse(responseData);
//               console.log(responseData);
//               //loop through jason
//               //if room_id=roomID -> if startdate == currentdate -> if starttime == currenttime
//                 // turn room button red

//             },error: function(msg) {
//                 // there was a problem
//                 alert("There was a problem: " + msg.status + " " + msg.statusText);
//             }
//   });

// }

function color_rooms(element, roomID){
  var url = "reservation_status.php";
  $.ajax({  
    type: 'POST',  
    url: 'reservation_status.php', 
    data: {room_id: roomID},
    success: function(response) {
        console.log(response);
    }
});
}


//when a floor tab is clicked, change colors accordingly
function openTab(floor, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
    tablinks[i].style.color = "";
  }
  document.getElementById(floor).style.display = "block";


  elmnt.style.backgroundColor = "rgba(245,245,245,0.1)";
  elmnt.style.color="rgb(85, 85, 85)";
}


//when DOM loads
$(document).ready(function() {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
    
    //load room buttons for each tab
    var first = document.getElementById("First");
    var second=document.getElementById("Second");
    var third=document.getElementById("Third");
    var base = document.getElementById("Basement");

    fetch_floor_rooms("First", this);
    fetch_floor_rooms("Second", this);
    fetch_floor_rooms("Third", this);
    fetch_floor_rooms("Basement", this);

    color_rooms(this, "1");

});



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

    var modal = document.getElementById('myModal');
    var modalContent = document.getElementsByClassName("modal-content")[0];
    var modalHead = document.getElementById("modalHead");
    var close = document.getElementsByClassName("close")[0]; //modal close button
    var close2 = document.getElementsByClassName("close")[1];
    var currentRoom = -1;
    var today = new Date();
    var tomorrow = new Date();
    var chosenDate = today;
    var viewRes = document.getElementById("viewRes");
    var viewResModal = document.getElementById("viewResModal");

    viewRes.onclick = function() { 
      viewResModal.style.display = "block";

    };

    //when a room button is clicked, open modal for that room
    function btnClick(id){
      //set title (room #)
      var title = document.createElement("P");
      var title = document.getElementById("modalTitle");
      title.innerHTML = "Room "+id; 
      currentRoom = id;
      today.getDate();
      tomorrow.setDate(today.getDate() + 1);
      document.getElementById("today").innerHTML = ("Today ("+(today.getUTCMonth()+1).toString()+"/"+(today.getUTCDate()).toString()+"/"+today.getUTCFullYear().toString()+")");
      document.getElementById("tomorrow").innerHTML = ("Tomorrow ("+(tomorrow.getUTCMonth()+1).toString()+"/"+(tomorrow.getUTCDate()).toString()+"/"+tomorrow.getUTCFullYear().toString()+")");
      modal.style.display = "block";
      createTimeTable();
      prevHoursUnavail();
    }

    function prevHoursUnavail(){
      enableAllTimes();
      var d = new Date();
      var currentHour = d.getHours();
      var times = document.getElementsByClassName('timebox');
      for(var i = 0; i<times.length; i++){
        id = parseInt(times[i].id);
        if(id<currentHour && chosenDate.getUTCDate() == today.getUTCDate()){
          times[i].disabled = true;
          txt = document.getElementById("txt"+i);
          txt.style.color = "lightgrey";
        }
      }
    }

    function enableAllTimes(){
      var times = document.getElementsByClassName('timebox');
      for(var i = 0; i<times.length; i++){
        id = parseInt(times[i].id);
        times[i].disabled = false;
        txt = document.getElementById("txt"+i);
        txt.style.color = "black";
      }
    }

    function createTimeTable(){
      for(var i =0; i<24; i++){
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("name", "time");
        x.setAttribute("value", i);
        x.setAttribute("id", i);
        x.setAttribute("class", "timebox");
        var t = document.createElement("P");
        t.setAttribute("id", "txt"+i);
        t.innerHTML = i+":00"; 
        var append;
        if(i<13){
          append = document.getElementById("row1");
        }
        else{
          append = document.getElementById("row2");
        }
        append.appendChild(x);
        append.appendChild(t);
      }
    }

    document.getElementById("dateSelect").onchange = function() {
      var dateVal = document.getElementById("dateSelect").value; 
      if(dateVal=="today"){
        chosenDate = today;
      }
      else if(dateVal=="tomorrow"){
        chosenDate = tomorrow;
      }
      prevHoursUnavail();

    }


    var button_modify = document.getElementsByClassName('roomBtn');
    for(var i = 0; i < button_modify.length; ++i){
        button_modify[i].onclick = function() { btnClick(this.id); };
    }

    //close button for main modal
    close.onclick = function(){
      modal.style.display="none";
      document.getElementById("today").innerHTML = "";
      document.getElementById("tomorrow").innerHTML = "";
      var row = document.getElementById("row1");
      while (row.firstChild) {
          row.removeChild(row.firstChild);
      }
      row = document.getElementById("row2");
      while (row.firstChild) {
          row.removeChild(row.firstChild);
      }      
    }

    //close button for view reservations modal
    close2.onclick = function(){
      viewResModal.style.display = "none";
    }
    
    //if user clicks out of modal, close modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("today").innerHTML = "";
        document.getElementById("tomorrow").innerHTML = "";
        var row = document.getElementById("row1");
        while (row.firstChild) {
            row.removeChild(row.firstChild);
        }
        row = document.getElementById("row2");
        while (row.firstChild) {
            row.removeChild(row.firstChild);
        }
      }
      if (event.target == viewResModal) {
        viewResModal.style.display = "none";
      }
    }

});

