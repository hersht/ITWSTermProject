
//pull all rooms from database
function fetch_floor_rooms(floor, element){
    $.ajax({
            type: "Post",
            url: "room_reservation_display.php",
            success: function(responseData, status){ //dynamically add buttons and information for each room to DOM
              responseData = JSON.parse(responseData);
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

              output+=curr_table;
              output+="<tr>";
              output+="<th> Room ID </th>";
              output+="<th> Number of Chairs </th>";
              output+="<th> Size </th>";
              output+="</tr>";

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
              output += "<br/>";
              for(var i = 0; i < curr_floor.length; ++i){
                  var curr_room = curr_floor[i];
                  output+="<tr>";
                  output+="<td> <button id = " + curr_room[0]+ " class = roomBtn> " +  curr_room[0] + " </button> </td>";
                  output+="<td>" + curr_room[1] + "</td>";
                  output+="<td>" + curr_room[2] + "</td>";
                  output+="</tr>"
              }
               output += "</table>";
              $(output).appendTo(document.getElementById(floor));

              if(floor === "Third"){  //change color of room button to green if the room is currently available
                for(var i =0; i<5; i++){
                  color_rooms(this, ""+i);
                }
                for(var i =10; i<15; i++){
                 color_rooms(this, ""+i); 
                }
                for(var i =20; i<25; i++){
                  color_rooms(this, ""+i);
                }
                for(var i =30; i<35; i++){
                  color_rooms(this, ""+i);
                }
              }                 

            },error: function(msg) {
                // there was a problem
                alert("There was a problem: " + msg.status + " " + msg.statusText);
            }
    });
}

//Pull data from database regarding which rooms are currently available
//Set those rooms color to green
function color_rooms(element, roomID){
  var url = "reservation_status.php";
  $.ajax({  
    type: 'POST',  
    url: 'reservation_status.php', 
    data: {"room_id": roomID, "day":"today"},
    success: function(response) {
      var d = new Date();
      console.log("COLOR RESPONSE: " +roomID+response);
      var currentHour = parseInt(d.getHours());

      response = JSON.parse(response);
      var array = response.hours;
      for(var i =0; i<array.length; i++){
        if(array[i] === currentHour){
          turnGreen(roomID);
        }
      }
    }
  });
}


//Turns room button green
function turnGreen(buttonID){
  var button = document.getElementById(buttonID);
  button.style.backgroundColor="#31bc53";
}


//Disable reservations for certain rooms at certain times if those times are already reserved
function disable_rooms(element, roomID, chosenDate){
  if(chosenDate === "today"){
    $.ajax({  
      type: 'POST',  
      url: 'reservation_status.php', 
      data: {"room_id": roomID, "day": "today"},
      success: function(response) {
        //get data for today and parse it
        var array = [];
        response = JSON.parse(response);
        var d = new Date();
        var currentHour = parseInt(d.getHours());
        var hrs = response.hours;
        var j = 0;
        for(var i = currentHour; i<24; i++){
          if(!hrs.includes(parseInt(i))){
            array[j] = parseInt(i);
            j++;
          }
        }
        //change frontend accordingly - disable certain times
        for(var i = 0; i<array.length; i++){
          var box = document.getElementById(array[i]+"box");
          var txt = document.getElementById("txt"+array[i]);
          box.disabled = true;
          txt.style.color = 'lightgrey';
        }
      }
    });
  }
  else{
    $.ajax({  
      type: 'POST',  
      url: 'reservation_status.php', 
      data: {"room_id": roomID},
      success: function(response) {
        //get data for tomorrow and parse it
        var array = [];
        response = JSON.parse(response);
        var d = new Date();
        var currentHour = parseInt(d.getHours());
        var hrs = response.hours;
        var j = 0;
        for(var i = currentHour; i<24; i++){
          if(!hrs.includes(parseInt(i))){
            array[j] = parseInt(i);
            j++;
          }
        }
        //change frontend accordinly - disable certain times
        for(var i = 0; i<array.length; i++){
          var box = document.getElementById(array[i]+"box");
          var txt = document.getElementById("txt"+array[i]);
          box.disabled = true;
          txt.style.color = 'lightgrey';
        }
      }
    });
  }
}

//get all selected times
function reserve(rcs_id, first_row_times, second_row_times, date, room_id_str, modal){
  var time_arr = [];
  boxes = document.getElementsByClassName("timebox");
  for(var x = 0; x < boxes.length; ++x){
    if(boxes[x].checked){
      time_arr[time_arr.length] = String(boxes[x].value);
    }
  }
   // console.log("TIME ARR: " + time_arr);
   room_params = room_id_str.split(" ");
 
   // console.log("RCS ID: " + rcs_id);
   // console.log("TIMES: " + time_arr);
   // console.log("DATE: " + date.value);
   // console.log("ROOM ID: " + room_params[1]);
  //insert reservations into data base




  var room_params = room_id_str.split(" ");
  //insert reservations into data base
  $.ajax({  
    type: 'POST',  
    url: 'reserve.php', 
    data: {"rcs_id": rcs_id, "times": time_arr,"date": date.value, "room_id": room_params[1]},
    success: function(response) {
      console.log("RESERVE RESPONSE: " + response);
    },
    error: function(){
      alert("error");
    }
  });


  alert("Reserved " + room_id_str + " successfully.");
  
  window.location.reload(false); 
}


//View Your Reservations
function resByRCSID(element, rcsId){
  var url = "display_reservation.php";
  $.ajax({
    type: 'POST',  
    url: 'display_reservation.php',
    data: {'rcs_id': rcsId},
    success: function(response) {
      //get data from database regarding certain RCS ID
      response = JSON.parse(response);
      console.log("RCS ID: RESPONSE: " + response);
      var res = response.Reservations;
      if(res.length == 0){
        var txt = document.getElementById("resByRCSTxt");
        txt.innerHTML = ("No reservations found");
      }
      var table = document.getElementById("resByRCSTable");
      //display reservations
      for(var i =0; i<res.length; i++){
        var room = res[i][1];
        var day = res[i][2];
        var time = res[i][3];
        var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = time;
        cell2.innerHTML = day;
        cell3.innerHTML = room;
      }
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

    //pull data from database - get all rooms in library
    fetch_floor_rooms("First", this);
    fetch_floor_rooms("Second", this);
    fetch_floor_rooms("Third", this);
    fetch_floor_rooms("Basement", this);
});

//View Your Reservations onclick
function showRes() {
  clearData();
  var data = document.getElementById("rcs_data").value;
  if(data === ""){
    alert("Please enter your RCS ID");
  }
  else{
    resByRCSID(this, data);
  }
} 

function clearData(){
  var x = document.getElementById("resByRCSTable").rows.length;
  for(var i = 1; i<x; i++){
    document.getElementById("resByRCSTable").deleteRow(1);
  }
  var txt = document.getElementById("resByRCSTxt");
  txt.innerHTML = ("");
}


$(document).ajaxComplete(function(){
    //modify css
    if($('h3').length != 0) {
        $('h3').css('margin-left', '400px');
    }

    if($('#Basement').length!=0){
        $('#Basement').css('white-space', 'nowrap');

    }
    if($('#room').length!=0){
         $('#room').css('display', 'inline');
         $('#room').css('margin-right', '600px');
         $('#room').css('margin-left', '350px');

    }

     if($('.curr_room').length!=0){
         $('.curr_room').css('margin-left', '250px');
         $('.curr_room').css('margin-right', '700px');
    }

    //get various dom elements to minipulate later
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

    //show/hide popup
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
      //get dates (today & tomorrow)
      today.getDate();
      tomorrow.setDate(today.getDate() + 1);
      console.log(today +" "+tomorrow);
      document.getElementById("today").innerHTML = ("Today ("+(today.getMonth()+1).toString()+"/"+(today.getDate()).toString()+"/"+today.getFullYear().toString()+")");
      document.getElementById("tomorrow").innerHTML = ("Tomorrow ("+(tomorrow.getMonth()+1).toString()+"/"+(tomorrow.getDate()).toString()+"/"+tomorrow.getFullYear().toString()+")");
      modal.style.display = "block";
      //fill in available times/disable reserved times
      createTimeTable();
      prevHoursUnavail();
      disable_rooms(this, id, "today");
    }

    //set all times before current hour to unavailable (cannot be reserved if time has already passed)
    function prevHoursUnavail(){
      enableAllTimes();
      if(chosenDate.getDate() == today.getDate()){
        var d = new Date();
        var currentHour = d.getHours();
        var times = document.getElementsByClassName('timebox');
        for(var i = 0; i<times.length; i++){
          id = parseInt(times[i].id);
          if(id<currentHour){
            times[i].disabled = true;
            txt = document.getElementById("txt"+i);
            txt.style.color = "lightgrey";
          }
        }
      }
    }

    //enable all time checkboxes
    function enableAllTimes(){
      console.log()
      var times = document.getElementsByClassName('timebox');
      for(var i = 0; i<times.length; i++){
        id = parseInt(times[i].id);
        times[i].disabled = false;
        txt = document.getElementById("txt"+i);
        txt.style.color = "black";
      }
    }

    //dynamically add the checkboxes for each time to the DOM
    function createTimeTable(){
      for(var i =0; i<24; i++){
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.setAttribute("name", "time");
        x.setAttribute("value", i);
        x.setAttribute("id", i+"box");
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

    //when user selects a date
    document.getElementById("dateSelect").onchange = function() {
      var dateVal = document.getElementById("dateSelect").value; 
      if(dateVal==="today"){
        chosenDate = today;
      }
      else if(dateVal==="tomorrow"){
        tomorrow.setDate(today.getDate() + 1);
        chosenDate = tomorrow;
      }
      prevHoursUnavail();
      var title = document.getElementById("modalTitle").innerHTML;
      var title_params = title.split(" ");
      disable_rooms(this, title_params[1], dateVal);
    }


    //apply onclick to each room button
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
      var val = "today";
      var sel = document.getElementById('dateSelect');
      var opts = sel.options;
      for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == val) {
          sel.selectedIndex = j;
          break;
        }
      }
    }

    //close button for view reservations modal
    close2.onclick = function(){
      viewResModal.style.display = "none";
      var x = document.getElementById("resByRCSTable").rows.length;
      for(var i = 1; i<x; i++){
        document.getElementById("resByRCSTable").deleteRow(1);
      }
      var txt = document.getElementById("resByRCSTxt");
      txt.innerHTML = ("");
      document.getElementById("rcs_data").value = "";
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
        var val = "today";
        var sel = document.getElementById('dateSelect');
        var opts = sel.options;
        for (var opt, j = 0; opt = opts[j]; j++) {
          if (opt.value == val) {
            sel.selectedIndex = j;
            break;
          }
        }
      }
      if (event.target == viewResModal) {
        viewResModal.style.display = "none";
        var x = document.getElementById("resByRCSTable").rows.length;
        for(var i = 1; i<x; i++){
          document.getElementById("resByRCSTable").deleteRow(1);
        }
        var txt = document.getElementById("resByRCSTxt");
        txt.innerHTML = ("");
        document.getElementById("rcs_data").value = "";
      }
    }

});


