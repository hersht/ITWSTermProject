<!DOCTYPE html>
<html>
  <head>
    <title>RoomRez Home</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="resources/style.css">
    <script type="text/javascript" src="resources/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="index.js"></script>
  </head>

<body>
	<div id="header">
		<h1>RoomRez</h1>
		<p>Welcome to our site! Click the tabs below to view study rooms on each floor of the library. Click a room to reserve it. Happy studying!
				<?php
		$randArray = array('small', 'medium', 'large');
		

		$servername = "localhost";
		$username = "root";
		$password = "mypass";
		$dbname = "room-res";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);

		// Check connection
		if ($conn->connect_error) {
    		die("Connection failed: " . $conn->connect_error);
		} 


		for($i = 0; $i<1000; $i++){
			$curr_rand = rand(0, 2);
			$curr_size = $randArray[$curr_rand];
			$curr_num_chairs = rand(1, 10);

//			 " INSERT INTO mytable VALUES ( 1 , '$name') "
			$sql = "INSERT INTO Room VALUES ($curr_num_chairs, $i, '$curr_size')";
			//echo $sql;

			if ($conn->query($sql) === TRUE) {
    			echo "New record created successfully";
			} else {
    			echo "Error: " . $sql . "<br>" . $conn->error;
			}
		}
		

		?>
		</p>
	</div>

	<div id="content">

		<button class="tablink" onclick="openTab('Basement', this, 'DodgerBlue')" id="defaultOpen">Basement</button>
		<button class="tablink" onclick="openTab('First', this, 'DeepSkyBlue')">First</button>
		<button class="tablink" onclick="openTab('Second', this, 'DarkTurquoise')">Second</button>
		<button class="tablink" onclick="openTab('Third', this, 'DarkCyan')">Third</button>

		<div id="Basement" class="tabcontent">
		  <h3>Basement</h3>
		  <p>Basement room list.</p>
		</div>

		<div id="First" class="tabcontent">
		  <h3>First Floor</h3>
		  <p>First floor room list.</p> 
		</div>

		<div id="Second" class="tabcontent">
		  <h3>Second Floor</h3>
		  <p>Second floor room list.</p>
		</div>

		<div id="Third" class="tabcontent">
		  <h3>Third Floor</h3>
		  <p>Third floor room list.</p>
		</div>
	</div>
</body>


</html>