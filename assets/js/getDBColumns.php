<?php

if (isset($_POST['DB']))
{	
	$dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "fastiandevloper";
    $dbname = $_POST['DB'];
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    $quer = "DESCRIBE "+$_POST["Tb"];
    $response = "";
    $result = $conn->query($quer);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        response += $row["Feild"];
    }
}
echo response;
}
?>