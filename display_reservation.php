<?php
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
		//$sql = "SELECT reservation.res_id, reservation.start, reservation.startdate, reservation.room_id FROM `reservation` WHERE reservation.rcs_id = '$RCS'";
		//$result = $db->query($sql);
		$stmt->execute();
		$stmt->bind_result($res_id, $room_id, $start_date, $start);
		//$numRecords = $result->num_rows;

		//for ($i=0; $i < $numRecords; $i++) {
		while($stmt->fetch()){
      		//$record = $result->fetch_assoc();


      		$curRes = [$res_id,$room_id,$start_date,$start];
      		$reservs[] = $curRes;
      	}
		//}

    
    	// Finally, let's close the database
    	$db->close();
	}
	$final_arr["Reservations"] = $reservs;
 	echo json_encode($final_arr);
?>
