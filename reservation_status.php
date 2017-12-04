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

$today_set = True;
$room = $_POST["room_id"];
if(isset($_POST["day"])){
	$today = date("Y-m-d");
}else{
	$today = date("Y-m-d", strtotime("+1 day"));
	$today_set = False;
}

if($today_set == True){
	$curr_time = date("h:i:sa");
	$curr_military_time = date("H:00:00", strtotime($curr_time));
}else{
	$curr_military_time = date("00:00:00");
}

if($today_set == True){
	$closest_hour = date('H');
}else{
	$closest_hour = 0;
}
$hours = [];
$reserved_hours = [];
$sql = "SELECT * FROM `reservation` WHERE startdate='$today' AND start>='$curr_military_time' AND room_id = '$room'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	$row_cnt = $result->num_rows;

     while($row = $result->fetch_assoc()) {
     	$curr_res = [$row["start"], $row["startdate"], $row["rcs_id"], $row["res_id"], $row["room_id"]];
     	$reserved_hours[] = date("H", strtotime($row["start"]));
    }
}

$closest_hour = (int)$closest_hour;
for($i = $closest_hour; $i <= 23; ++$i){
	$found_hour = False;
	for($j = 0; $j < count($reserved_hours); ++$j){
		if($i == (int)$reserved_hours[$j]){
			$found_hour = True;
		}
	}
	if($found_hour == False){
		$hours[]=$i;
	}
}

$final_arr["hours"] = $hours;
echo json_encode($final_arr);
?>