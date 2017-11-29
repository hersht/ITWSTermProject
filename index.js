
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
    var roomIDs = [001, 002, 003, 004, 101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304];
    var first = document.getElementById("First");
    var second=document.getElementById("Second");
    var third=document.getElementById("Third");
    var base = document.getElementById("Basement");
    
    for(var i = 0; i<roomIDs.length; i++){
      if(roomIDs[i]<100){
        //basement tab
      
        var btn = document.createElement("BUTTON");
        btn.setAttribute("id",roomIDs[i]);
        btn.setAttribute("class","roomBtn");
        btn.innerHTML = "00"+roomIDs[i];
        base.appendChild(btn);
        btn.onclick = function() { 
          btnClick(this.id); };
      }
      else if(roomIDs[i]<200 && roomIDs[i]>99){
        //first tab
        var btn = document.createElement("BUTTON");
        btn.setAttribute("id",roomIDs[i]);
        btn.setAttribute("class","roomBtn");
        btn.innerHTML = ""+roomIDs[i];
        btn.click(function() {onClick(roomIDs[i])});
        first.appendChild(btn);
        btn.onclick = function() { btnClick(this.id); };
      }
      else if(roomIDs[i]<300 && roomIDs[i]>199){
          //second tab
        var btn = document.createElement("BUTTON");
        btn.setAttribute("id",roomIDs[i]);
        btn.setAttribute("class","roomBtn");
        btn.innerHTML = ""+roomIDs[i];
        btn.click(function() {onClick(roomIDs[i])});
        second.appendChild(btn);
        btn.onclick = function() { btnClick(this.id); };
      }
      else if(roomIDs[i]<400 && roomIDs[i]>299){
        //third tab
        var btn = document.createElement("BUTTON");
        btn.setAttribute("id",roomIDs[i]);
        btn.setAttribute("class","roomBtn");
        btn.innerHTML = ""+roomIDs[i];
        btn.click(function() {onClick(roomIDs[i])});
        third.appendChild(btn);
        btn.onclick = function() { btnClick(this.id); };
      }
    }
  
    var modal = document.getElementById('myModal');
    var modalContent = document.getElementsByClassName("modal-content")[0];
    var modalHead = document.getElementById("modalHead");
    var close = document.getElementsByClassName("close")[0]; //modal close button

    //when a room button is clicked, open modal for that room
    function btnClick(id){
      //set title (room #)
      var title = document.createElement("P");
      var title = document.getElementById("modalTitle");
      title.innerHTML = "Room "+id; 
      
      var today = new Date();
      var tomorrow = new Date();
      today.getDate();
      tomorrow.setDate(today.getDate() + 1);
      document.getElementById("today").innerHTML = ( "Today ("+(today.getUTCMonth()+1).toString()+"/"+(today.getUTCDate()-1).toString()+"/"+today.getUTCFullYear().toString()+")");
      document.getElementById("tomorrow").innerHTML = ("Tomorrow ("+(tomorrow.getUTCMonth()+1).toString()+"/"+(tomorrow.getUTCDate()-1).toString()+"/"+tomorrow.getUTCFullYear().toString()+")");
      modal.style.display = "block";
    }

    

    function createDatePicker(today, tomorrow){

    }

    //close button
    close.onclick = function(){
      modal.style.display="none";
      document.getElementById("today").innerHTML = "";
      document.getElementById("tomorrow").innerHTML = "";
    }
    
    //if user clicks out of modal, close modal
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("today").innerHTML = "";
        document.getElementById("tomorrow").innerHTML = "";     
      }
    }

    var reserveBtn = document.getElementById("reserveBtn");
    reserveBtn.onclick = function() {
      console.log("reserved"); 


    };
});