<?php
//header('Content-Type: text/html; charset=UTF-8');
//header('Content-Type: image/jpeg');
$Browser = new COM('InternetExplorer.Application');
$Browserhandle = $Browser->HWND;
$Browser->Visible = true;
//$Browser->Fullscreen = true;
//$Browser->Navigate('http://www.stackoverflow.com');

while($Browser->Busy){
  com_message_pump(4000);
}

echo "Brouser Handle :" . $Browserhandle;
$img = imagegrabwindow($Browserhandle, 0);
//$Browser->Quit();

imagejpeg($img, 'screenshot.jpg');



//imagepng($img, 'screenshot.jpeg');
?>