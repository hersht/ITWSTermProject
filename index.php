<?php 
  include('includes/init.inc.php'); // include the DOCTYPE and opening tags
  // include('includes/functions.inc.php'); // functions
?>
<title>RoomRez Home</title>

<?php 
  include('includes/head.inc.php'); 
  // include global css, javascript, end the head and open the body
?>
<div id="content">
    <div id="header">
      <button id="viewRes">View Your Reservations</button>
      <h1 id="title">RoomRez</h1>
      <p id="intro">Click the tabs below to view study rooms on each floor of the library. Click a room to reserve it. A room appears red below if it is currently occupied, but you can still click it to reserve for later. Happy studying!</p>
    </div>
    <div id="roomContent">
      <button class="tablink" onclick="openTab('Basement', this)" id="defaultOpen">Basement</button>
      <button class="tablink" onclick="openTab('First', this)">First</button>
      <button class="tablink" onclick="openTab('Second', this)">Second</button>
      <button class="tablink" onclick="openTab('Third', this)">Third</button>

      <div id="Basement" class="tabcontent">
  <!--      <h3>Basement</h3>-->
        <ul id="baseTab"></ul>
      </div>

      <div id="First" class="tabcontent">
  <!--      <h3>First Floor</h3>-->
        <ul id="firstTab"></ul>
      </div>

      <div id="Second" class="tabcontent">
  <!--      <h3>Second Floor</h3>-->
        <ul id="secondTab"></ul>
      </div>

      <div id="Third" class="tabcontent">
  <!--      <h3>Third Floor</h3>-->
        <ul id="thirdTab"></ul>
      </div>
    </div>
  <!-- The Modal -->
    <div id="myModal" class="modal">
    <!-- Modal content -->
      <div class="modal-content" id="mainModalContent">

        <span class="close">&times;</span>
        <div id="modalHead">
          <p id="modalTitle" style="font-size: 25px; font-weight: bold;"></p>
          <p id="modalIntro">Choose a date and time to reserve. You can reserve a room for today or tomorrow. Be sure to check ALL blocks you would like to reserve for the selected day.</p>
        </div>

        <div id="reservationPicker">
          <div id="modalDate" class="reserve">
            <form action=""> 
              <p>Choose a date</p>
              <select id="dateSelect">
                <option id="today" class="date" name="date" value="today">
                <option id= "tomorrow" class="date" name="date" value="tomorrow">
              </select>
              <p>Choose times</p>
              <div id="row1"></div>
              <div id="row2"></div>
              
              <form action="">
                Enter RCS ID:<br>
              <input type="text" name="firstname" id = "rcs_id_val">
              </form> 
              <br/>
              <br/>
              <input type="submit" value="Reserve" onclick = "reserve(document.getElementById('rcs_id_val').value,  
              document.getElementById('row1'), document.getElementById('row2'), document.getElementById('dateSelect'), 
              document.getElementById('modalTitle').innerHTML), document.getElementById('reservationPicker')">
              
            </form>
          </div>          
        </div>
      </div>
    </div>

    <!-- View Your Reservations Modal -->
    <div class="modal" id="viewResModal">
      <!--Content-->
      <div class="modal-content" id="viewResContent">
          <span class="close">&times;</span>
          <div id="viewResForm">
            Enter RCS ID:<br>

            <input type="text" name="RCS" id="rcs_data">

            <br><br>
            <button onclick ="showRes()" id="rcs_button">Go</button>
          </div> 
          <table style = 'width: 100%' id = 'resByRCSTable'>
            <tr>
              <td>Room</td>
              <td>Day</td>
              <td>Time</td>
            </tr>
          </table>
          <p id = "resByRCSTxt"></p> 
      </div>
    </div>
  </div>
</body>