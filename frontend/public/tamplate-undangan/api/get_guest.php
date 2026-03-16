<?php

include "config.php";

$slug = $_GET['slug'];

$query = mysqli_query($conn,"SELECT guest_name FROM guests WHERE slug='$slug'");

$data = mysqli_fetch_assoc($query);

echo json_encode([
    "name"=>$data['guest_name']
]);