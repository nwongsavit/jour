<?php

//include any needed files here, specifically config.php
include('config.php');

//Establish a link to the database. Include this file in any file that needs database connectivity.
//This will create an mysqli object, $link, that will allow interactivity with the database.
//Usage: $link->query("query here");

//create link to database
$hostname = "localhost";
$db_user = "jour_jour";
$db_password = $db_pass;
$database = "jour_jour";
$link = mysqli_connect($hostname, $db_user, $db_password, $database);

//make sure that the link was established
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
}

?>