<?php


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


$room_id = $_POST['room_id'];

$today = date("Y-m-d");
$curr_time = date("h:i:sa");
$curr_military_time = date("G:i", strtotime($curr_time));
$closest_hour = date('H')+1;
$hours = [];
$reserved_hours = [];



$sql = "SELECT * FROM `reservation` WHERE startdate='$today' AND start>='$curr_military_time' AND room_id = '$room_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$row_cnt = $result->num_rows;

    //echo "Result set has %d rows.\n".$row_cnt;
     while($row = $result->fetch_assoc()) {
     	$curr_res = [$row["start"], $row["startdate"], $row["rcs_id"], $row["res_id"], $row["room_id"]];
     	// if($curr_res[0] > $curr_military_time){
     	// 	echo "Yes <br>";
     	// }
     	$reserved_hours[] = date("H", strtotime($row["start"]));
     	
      // echo "id: ".$curr_res[0].$curr_res[1].$curr_res[2]. $curr_res[3].$curr_res[4].$curr_res[5]."<br>";
    }
}


for($i = $closest_hour; $i <= 23; ++$i){
	$found_hour = False;
	for($j = 0; $j < count($reserved_hours); ++$j){
		//echo "RESERVED: ".$reserved_hours[$j];
		if($i == $reserved_hours[$j]){
			$found_hour = True;
		}
	}

	if($found_hour == False){
		$hours[]=$i;
	}
	
}


// for($k = 0; $k < count($hours); ++$k){
// 	echo "Valid hour: ". $hours[$k]."<br>";
// }



$final_arr["hours"] = $hours;


echo json_encode($final_arr);




?>