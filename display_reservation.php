<?php

	$servername = "localhost";
	$username = "root";
	$password = "bulldog1";
	$dbname = "room-res";

	$dbOk = false;
  

	@ $db = new mysqli('localhost', 'root', 'cestlafin1', 'room-res');

	  
	if ($db->connect_error) {
		echo '<div class="messages">Could not connect to the database. Error: ';
	    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
	} else {
	    $dbOk = true;
	}

	$stmt = $db->prepare("SELECT reservation.res_id, reservation.start, reservation.startdate, reservation.room_id FROM `reservation` WHERE reservation.rcs_id = ?");
	$stmt->bind_param("s", $RCS);

	$RCS = $_POST["rcs_id"];

	$reservs = [];

	if ($dbOk) {
		$stmt->execute();
		$stmt->bind_result($res_id, $room_id, $start_date, $start);
		while($stmt->fetch()){
      		$curRes = [$res_id,$room_id,$start_date,$start];
      		$reservs[] = $curRes;
      	}
    	$db->close();
	}
	$final_arr["Reservations"] = $reservs;
 	echo json_encode($final_arr);
?>
