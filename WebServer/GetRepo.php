<?php
header("Content-Type: application/json");


session_start();
$key = key($_POST);
$json = json_decode( stripslashes($key), true);


$repoName = $json["filename"];
$userid = $json["userid"];


////////////////
$fp = fopen("repo.txt",'w');
///////////////
$pdo = new PDO("mysql:host=127.0.0.1;dbname=WebIDE", "master", "bitnami") or die("PDO creation failure");

$stm = $pdo->prepare("select filepath from project where userid = '$userid' and projectName = '$repoName'");

$stm->execute() or die("execute failed");

$projectPath = $stm->fetch(PDO::FETCH_OBJ);
$Path = $projectPath->filepath . $repoName . "/Code.cpp.cpp";

$readfilepointer = fopen($Path,'r');
$data = fread($readfilepointer,filesize($Path));
$response["data"] = $data;
fwrite($fp,json_encode($response));

echo json_encode($response);


?>
