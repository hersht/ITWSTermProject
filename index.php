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
      <h1>RoomRez</h1>
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
      <div class="modal-content">

        <span class="close">&times;</span>
        <div id="modalHead">
          <p id="modalTitle" style="font-size: 25px;"></p>
          <p id="modalIntro">Choose a date and time to reserve. You can reserve a room for today or tomorrow. Be sure to check ALL blocks you would like to reserve for the selected day. Only available times are displayed.</p>
        </div>

        <div id="reservationPicker">
          <div id="modalDate" class="reserve">
            <p>Choose a date</p>
            <form action="">
              <select id="dateSelect">
                <option id="today" class="date" name="date" value="today">
                <option id= "tomorrow" class="date" name="date" value="tomorrow">
              </select>
            </form>
          </div>
          <div id="modalTime" class="reserve">
            <p>Choose times</p>
          </div>
        </div>

        <div id="reserveBtn">
          <button>Reserve</button>
        </div>
      </div>

    </div>
  </div>
</body>