<?php
	$dbOk = false;
  
	@ $db = new mysqli('localhost', 'root', 'mypass', 'room-res');
	  
	if ($db->connect_error) {
		echo '<div class="messages">Could not connect to the database. Error: ';
	    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
	} else {
	    $dbOk = true;
	}

	$RCS = $_POST["rcs_id"];

	$reservs = [];

	if ($dbOk) {
		$sql = "SELECT reservation.res_id, reservation.start, reservation.startdate, reservation.room_id FROM `reservation` WHERE reservation.rcs_id = '$RCS'";
		$result = $db->query($sql);
		$numRecords = $result->num_rows;

		for ($i=0; $i < $numRecords; $i++) {
      		$record = $result->fetch_assoc();


      		$curRes = [$record["res_id"],$record["room_id"],$record["startdate"],$record["start"]];
      		$reservs[$i] = $curRes;
		}

    
    	// Finally, let's close the database
    	$db->close();
	}
	$final_arr["Reservations"] = $reservs;
 	echo json_encode($final_arr);
?>
