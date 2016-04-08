<?php

$Database = "excel";
$sheetnum = 0;
$tablename = "vehicle_original";
$ordering = "ADEBC";

/** Include path **/
set_include_path(get_include_path() . PATH_SEPARATOR . '../PHPExcel/Classes');

/** PHPExcel_IOFactory */
include 'PHPExcel/IOFactory.php';


$inputFileName = './data.xls';

$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
$objReader = PHPExcel_IOFactory::createReader($inputFileType);
$objPHPExcel = $objReader->load($inputFileName);


$sheetData = $objPHPExcel->getSheet($sheetnum)->toArray(null,true,true,true);

$UserName = "root";
$Password = "fastiandevloper";
$server   = "localhost";

$sourceConnection = new mysqli($server, $UserName, $Password, $Database);
$sql = "DESCRIBE ".$tablename;
$resultSet = $sourceConnection->query($sql);
$feilds = array();
$idx = 0;

while ($row = $resultSet->fetch_assoc()) {
	$feilds[$idx++] =  $row;
}
$num = 0;
echo $sheetData[2][$ordering[$num++]];

//var_dump($feilds);

//$sql = "INSERT INTO ". $tablename." VALUES(".$sheetData[2][$ordering[$num++]].","."'".$sheetData[2][$ordering[$num++]]."'".","."'".$sheetData[2][ordering[$num++]]."'".","."'".$sheetData[2][$ordering[$num++]]."'".","."'".$sheetData[2][$ordering[$num++]]."'".")";

if ($sourceConnection->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $sourceConnection->error;
}

//var_dump($sheetData);

?>