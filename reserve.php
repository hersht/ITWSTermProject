<?php

echo "REACHES THIS FILE:";
$servername = "localhost";
$username = "root";

$password = "cestlafin1";
$dbname = "room-res";


echo "HERE:";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 


$stmt = $conn->prepare("INSERT INTO reservation(start, startdate, rcs_id, res_id, room_id) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $curr_time, 
	$date_to_reserve, $rcs_identification, $random_res_id, $room);


$date_to_reserve = $_POST["date"];
$times_arr = $_POST["times"];
$rcs_identification = $_POST["rcs_id"];
$room = $_POST["room_id"];
if($date_to_reserve == "today"){
	$date_to_reserve = date("Y-m-d");
}
else if($date_to_reserve == "tomorrow"){
	$date_to_reserve = date("Y-m-d", strtotime("+1 day"));
}

 echo "DATE: ".$date_to_reserve;
 echo "TIMES: ".$times_arr;
 echo "RCS ID: ".$rcs_identification;
 echo "ROOM: ".$room;


for($i = 0; $i < count($times_arr); ++$i){
	$random_res_id = rand(0, 100);
	
	if((int)$times_arr[$i] < 10){
		$times_arr[$i] = "0".$times_arr[$i].":00:00";
	}else{
		$times_arr[$i] = $times_arr[$i].":00:00";
	}
	echo "CURR TIME: ".$times_arr[$i];
	$curr_time = $times_arr[$i];
	//$sql = "INSERT INTO reservation(start, startdate, rcs_id, res_id, room_id) VALUES ('$times_arr[$i]', 
	//'$date_to_reserve', '$rcs_identification', '$random_res_id', '$room')";
	
	$stmt->execute();

	//$result = $conn->query($sql);
} 






?>