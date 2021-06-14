<?php
header("Content-Type: application/json");

	// if you want to access from Unity, disable JSON_INPUT by commenting out above line.
$key = key($_POST);
$json = json_decode( stripslashes($key), true);

$error = "Regist Success";

$userid = $json["userid"];
$passwd = $json["password"];
$name = $json["username"];

$pdo = new PDO("mysql:host=127.0.0.1;dbname=WebIDE", "master", "bitnami") or die("PDO creation failure");

$stm = $pdo->prepare("insert into UserAccount values('$userid' , sha2( '$passwd', 224), '$name')");

$stm->execute() or $error = "is already Exist";
//////////////////////////////
$response["post"] = $_POST;
$response["userid"] = $userid;
$response["passwd"] = $passwd;
$response["name"] = $name;

$fp = fopen("response.txt",'w');
fwrite($fp,json_encode($response));

$response["error"] = $error;

/////////////////////////////
$result = $stm->fetchAll(PDO::FETCH_OBJ);




echo json_encode($response);
?>