<?php

if (isset($_POST['source']))
{	
	$dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "fastiandevloper";
    $dbname = $_POST['source'];
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    $quer = "Show Tables";
    $response = "";
    $result = $conn->query($quer);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        response += $row;
    }
}
echo response;
}
?>