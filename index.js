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

}

$(document).ready(function() {
// Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

});