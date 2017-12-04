<?php
date_default_timezone_set("America/New_York");
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


$stmt = $conn->prepare("INSERT INTO reservation(start, startdate, rcs_id, res_id, room_id) VALUES (?, ?, ?, ?, ?)");


$date_to_reserve = $_POST["date"];
$times_arr = $_POST["times"];
$rcs_identification = htmlspecialchars($_POST["rcs_id"]);
$room = $_POST["room_id"];
if($date_to_reserve == "today"){
	$date_to_reserve = date("Y-m-d");
}
else if($date_to_reserve == "tomorrow"){
	$date_to_reserve = date("Y-m-d", strtotime("+1 day"));
}


echo "COUNT: ".count($times_arr);
for($i = 0; $i < count($times_arr); ++$i){
	echo "TIME: ".$times_arr[$i];
	$random_res_id = rand(0, 100);
	



	if((int)$times_arr[$i] < 10){
		$times_arr[$i] = "0".$times_arr[$i].":00:00";
	}else{
		$times_arr[$i] = $times_arr[$i].":00:00";
	}
	$curr_time = $times_arr[$i];

	$stmt->bind_param("sssss", $curr_time, 
	$date_to_reserve, $rcs_identification, $random_res_id, $room);


	echo "CURR TIME: ".$curr_time;
	$stmt->execute();
} 






?>