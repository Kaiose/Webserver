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



$pdo = new PDO("mysql:host=127.0.0.1;dbname=WebIDE", "master", "bitnami") or die("PDO creation failure");

$stm = $pdo->prepare("delete from project where userid='$userid' and proejectName='$repoName'");

$stm->execute() or die("execute failed");

shell_exec("rmdir /s /q ../$repoName")


?>
