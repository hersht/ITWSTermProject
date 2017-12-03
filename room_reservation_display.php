<?php


$servername = "localhost";
$username = "root";



$password = "mypass";
$dbname = "room-res";


$floors = [];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

 $lower_bound = 0;


for($i = 0; $i < 4; ++$i){
 $curr_floor = [];
 $max_id = 5  + ($i * 10);
 $sql = "SELECT * FROM `Room` WHERE room_id<$max_id AND $lower_bound<=room_id";
 $result = $conn->query($sql);
 $lower_bound = $max_id + 5;

 if ($result->num_rows > 0) {

    /* determine number of rows result set */
    $row_cnt = $result->num_rows;

//    echo "Result set has %d rows.\n".$row_cnt;
     while($row = $result->fetch_assoc()) {
     	$curr_room = [$row["room_id"], $row["chair_num"], $row["size"]];

     	$curr_floor[] = $curr_room;
      //  echo "id: " . $row["room_id"]. " - Chairs: " . $row["chair_num"]. " " . $row["size"]. "<br>";
    }
    $floors[$i] = $curr_floor;

    /* close result set */
    $result->close();
 }

}

 // 	echo "<br/>";
 // for($i = 0; $i < count($floors); $i++){
 // 	echo ($i + 1)."th Floor";
 // 	echo "<br/>";
 // 	for($j = 0; $j < count($floors[$i]); $j++){
 // 		//echo($floors[$i][$j]);
 // 		for($k = 0; $k < count($floors[$i][$j]); $k++){
 // 			echo($floors[$i][$j][$k]);

 // 		}
 // 		echo "<br/>";
 // 	}
 // 	echo "<br/>";
 // }

 $final_arr["Floors"] = $floors;
 echo json_encode($final_arr);

// /* close connection */
 //$mysqli->close();
?>