<?php

include "../parse_input.php";

$filename = $_REQUEST["filename"];//$json["filename"];
$code = $_REQUEST["code"];
$repo = $_REQUEST["repo"];
$filepath = "../$repo/$filename";
$fp = fopen( "$filepath.cpp",'w');

fwrite($fp, $code);


header('Content-Type: application/json');


$output = shell_exec("g++ $filepath.cpp -o $filepath.exe && cd ../$repo && $filename.exe" );


$response["code"] = $code;
$response["result"] = $output;

echo json_encode($response);



?>