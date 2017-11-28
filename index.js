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
        $("#floor").slideDown();

    elmnt.style.backgroundColor = "rgba(245,245,245,0.1)";
    elmnt.style.color="rgb(85, 85, 85)";
}


//when DOM loads
$(document).ready(function() {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
    

    var roomIDs = [001, 002, 003, 101, 102, 103, 201, 202, 203, 301, 302, 303];
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
    var close = document.getElementsByClassName("close")[0]; //modal close button
    close.onclick = function(){
      modal.style.display="none";
      var title = document.getElementById("modalTitle");
      modalContent.removeChild(title);
    }

    //when a room button is clicked, open modal for that room
    function btnClick(id){
      var title = document.createElement("P");
      title.setAttribute("id", "modalTitle");
      title.innerHTML = "Room "+id; 
      modalContent.append(title);
      modal.style.display = "block";
    }
    
    //if user clicks out of modal, close modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            var title = document.getElementById("modalTitle");
            modalContent.removeChild(title);            
        }
    }


});