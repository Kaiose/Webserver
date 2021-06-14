<?php
	
include "../parse_input.php";

header("Content-Type: application/json");

$path = "C:\\Bitnami\\wampstack-7.1.8-0\\apache2\\htdocs\\ProjectFiles";


session_start();

$response = [ "error" => "no" ];

$projectName = $json["projectname"];
var_dump($_SESSION);
// login 의 userID를 아직 보유하고 있다면 그것을 이용하자.
//$passwd = $json["password"];
//$username = $json["username"];


$pdo = new PDO("mysql:host=127.0.0.1;dbname=WebIDE", "master", "bitnami") or die("PDO creation failure");

$stm = $pdo->prepare("insert into project Values(userid= :userid , projectname= :projectname, path = :path");

$stm->execute( [ ":userid" => $userid , ":projectname" => $projectName , ":path" => $path] ) or die("execute failed");
$result = $stm->fetch(PDO::FETCH_OBJ);
if ($result) {
	$response["error"] = "regist success!!";
}
else {
	$response["error"] = "is already Exist";
}

echo json_encode($response);
?>