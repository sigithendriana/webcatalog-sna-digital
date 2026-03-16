<?php

include "config.php";

$code = $_GET['code'];

$stmt = $conn->prepare("
SELECT guest_name,message,created_at
FROM wishes
WHERE invitation_code=?
ORDER BY id DESC
");

$stmt->bind_param("s",$code);
$stmt->execute();

$result=$stmt->get_result();

$data=[];

while($row=$result->fetch_assoc()){
$data[]=$row;
}

echo json_encode($data);