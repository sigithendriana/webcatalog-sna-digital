<?php

include "config.php";

$code = $_POST['code'];
$name = $_POST['name'];
$msg  = $_POST['message'];
$ip   = $_SERVER['REMOTE_ADDR'];

if(!$name || !$msg){
echo "empty";
exit;
}

$check = $conn->query("
SELECT id FROM wishes 
WHERE ip='$ip'
AND created_at > (NOW() - INTERVAL 10 SECOND)
");

if($check->num_rows > 0){
echo "spam";
exit;
}

$stmt = $conn->prepare("
INSERT INTO wishes (invitation_code,guest_name,message,ip)
VALUES (?,?,?,?)
");

$stmt->bind_param("ssss",$code,$name,$msg,$ip);
$stmt->execute();

echo "success";