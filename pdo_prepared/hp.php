<?php
	
include "../parse_input.php";
	
header("Content-Type: application/json");
	
session_start();

$inc = $json["hp_increase"];

$response = [ "error" => "no" ];

if (empty($_SESSION["userid"])) {
	$response["error"] = "you haven't logged.";
	echo json_encode($response);
	return;
}

$userid = $_SESSION["userid"];

$pdo = new PDO("mysql:host=localhost;dbname=my_game", "graduate", "bitnami") or die("PDO creation failure");

if (empty($_SESSION["hp"]) )
{
	$stm = $pdo->prepare("select hp from UserAccount where userid= :userid");
	$stm->execute( [ ":userid" => $userid ] ) or die("execute failed");
	$result = $stm->fetch(PDO::FETCH_OBJ);
	if ($result) {
		$_SESSION["hp"] = $result->hp;
	}
	else {
		$response["error"] = "not registered or not matched password.";
		echo json_encode($response);
		return;
	}
} 

$_SESSION["hp"] = $_SESSION["hp"] + $inc;
$stm = $pdo->prepare("update UserAccount set hp=:hp where userid=:userid") or die("prepare failed");
$stm->execute( [ ":hp" => $_SESSION["hp"], ":userid" =>$userid ]);

$response["hp"] = $_SESSION["hp"];

echo json_encode($response);

?>
