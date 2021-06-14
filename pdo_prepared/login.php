<?php
header("Content-Type: application/json");

// if you want to access from Unity, disable JSON_INPUT by commenting out above line.
$key = key($_POST);
$json = json_decode( stripslashes($key), true);


$response["error"] = "no";


session_start();

$userid = $json["userid"];
$passwd = $json["password"];
//var_dump($json);
$_SESSION["userid"] = null;

$response["userid"] = $json["userid"];
$response["password"] = $json["password"];


$pdo = new PDO("mysql:host=127.0.0.1;dbname=WebIDE", "master", "bitnami") or die("PDO creation failure");

$stm = $pdo->prepare("select name from UserAccount where userid= :userid and passwd=sha2( :passwd, 224)");

$stm->execute( [ ":userid" => $userid, ":passwd" =>$passwd ] ) or die("execute failed");
$result = $stm->fetch(PDO::FETCH_OBJ);
if ($result) {
	$_SESSION["userid"] = $userid;

	$response["name"] = $result->name;

	$stm = $pdo->prepare("select projectName from project, useraccount where project.userid = useraccount.userid and useraccount.userid= :userid");

	$stm->execute( [ ":userid" => $userid,] ) or die("execute failed");

	$projectName = $stm->fetch(PDO::FETCH_OBJ);
	$projectList = [];
	while($projectName != null){
		$proejctList[] = $projectName;
		$projectName = $stm->fetch(PDO::FETCH_OBJ);

	}

}
else {
	$response["error"] = "not registered or not matched password.";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

$response["post"] = $_POST;
$response["projectList"] = $proejctList; 
$json = json_encode($response);
$fp = fopen("response.txt",'w');

fwrite($fp,$json);
//console.log(json_encode($response));
echo $json;
?>