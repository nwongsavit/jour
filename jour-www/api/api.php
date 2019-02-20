<?php

//jour api
//requires PHP 7.3 or higher
//include necessary files.
include('db.php');
include ('users.php');

//jour API

//make sure link is set, if not send false result.
if (!isset($link)) {
    $error = array('result' => 'false', 'message' => "Error: couldn't get the database information.");
    echo json_encode($error);
    return;
}

//error if no request is made and send the result.
if (!isset($_GET['request'])) {
    $error = array('result' => 'false', 'message' => "Error: Request required.");
    echo json_encode($error);
    return;
}

//check to see if the email address is already in the users database.
if (isset($_GET['request']) && $_GET['request'] == "isUser") {
    //make sure api call requirements are met.
    if (!isset($_GET['email'])) {
        $error = array('result' => 'false', 'message' => "Error: Missing required data. Please provide an email address.");
        echo json_encode($error);
        return;
    }
    //we have what we need to see if the user already exists, make the check.
    $user = new users();
    if (!$user->isUser($_GET['email'])) {
        $result = array('result' => 'false', 'message' => "No associated user.");
        echo json_encode($result);
        return;
    }
    else {
        $result = array('result' => 'true', 'message' => "An account with email address: ". $_GET['email'] . " already exists.");
        echo json_encode($result);
        return;
    }
}

//api call for user registration
if (isset($_GET['request']) && $_GET['request'] == "registerUser") {
    //make sure api call requirements are met.
    if (!isset($_GET['email']) || !isset($_GET['name']) || !isset($_GET['password'])) {
        if (!isset($_GET['email'])) {
            $neededParams[] = "Email Address";
        }
        if (!isset($_GET['name'])) {
            $neededParams[] = "First Name";
        }
        if (!isset($_GET['password'])) {
            $neededParams[] = "Password";
        }
        $error = array('result' => 'false', 'message' => "Error: Missing required data. Please provide an email address, name, and password.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //we have what we need to see if the user already exists, make the check.
    $user = new users();
    //lets double check and make sure that this email address isn't already taken.
    if ($user->isUser($_GET['email'])) {
        $error = array('result' => 'false', 'message' => "Error: The email address provided is already associated with an account.");
        echo json_encode($error);
        return;
    }
    if (!$user->registerUser($_GET['email'], $_GET['name'], $_GET['password'])) {
        $error = array('result' => 'false', 'message' => "The account was not created.");
        echo json_encode($error);
        return;
    }
    else {
        $result = array('result' => 'true', 'message' => "Account created for " . $_GET['email'] . ".");
        echo json_encode($result);
        return;
    }
}

?>