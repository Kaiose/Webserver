<?php
header("Content-Type: application/json");


session_start();
$key = key($_POST);
$json = json_decode( stripslashes($key), true);


$repoName = $json["filename"];
$userid = $json["userid"];


////////////////
$fp = fopen("repo.txt",'w');
fwrite($fp,$userid);
///////////////
mkdir("../$repoName");



$pdo = new PDO("mysql:host=127.0.0.1;dbname=WebIDE", "master", "bitnami") or die("PDO creation failure");

$stm = $pdo->prepare("insert into project(userid, projectName,filepath) values('$userid','$repoName','C:/Bitnami/wampstack-7.1.29-0/apache2/htdocs/')");

$stm->execute() or die("execute failed");


?>
