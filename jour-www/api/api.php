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
//check to see if the email address is waiting to be confirmed.
if (isset($_GET['request']) && $_GET['request'] == "isWaitingConf") {
    //make sure api call requirements are met.
    if (!isset($_GET['email'])) {
        $error = array('result' => 'false', 'message' => "Error: Missing required data. Please provide an email address.");
        echo json_encode($error);
        return;
    }
    //we have what we need to see if the user already exists, make the check.
    $user = new users();
    if (!$user->isWaitingConf($_GET['email'])) {
        $result = array('result' => 'false', 'message' => "No associated email is waiting confirmation.");
        echo json_encode($result);
        return;
    }
    else {
        $result = array('result' => 'true', 'message' => "An account with email address: ". $_GET['email'] . " is waiting for confirmation.");
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
    //check to make sure the data is valid.
    if (!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)) {
        $error = array('result' => 'false', 'message' => "Error: The email address provided is not valid.");
        echo json_encode($error);
        return;
    }

    $password = $_GET['password'];
    if(!preg_match('/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_%^&+\=\*$! \?]{8,80}$/',$password)) {
        //password does not meet requirements
        /*requirements
            Characters: 8-80
            1 capital letter
            1 number
            1 symbol (@#-_$%^&+=!?* space)
        */
        $error = array('result' => 'false', 'message' => "Error: The password provided does meet requirements.");
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
    //check to make sure the user isn't already in the queue for confirmation
    if($user->isWaitingConf($_GET['email'])){
        $error = array('result' => 'false', 'message' => "This email is already awaiting confirmation.");
        echo json_encode($error);
        return;
    }
    if (!$user->registerUser($_GET['email'], $_GET['name'], $_GET['password'])) {
        $error = array('result' => 'false', 'message' => "The account was not created.");
        echo json_encode($error);
        return;
    }
    else {
        $result = array('result' => 'true', 'message' => "Account creation for " . $_GET['email'] . " is pending confirmation.");
        echo json_encode($result);
        return;
    }
}

//confirm the users email address
if (isset($_GET['request']) && $_GET['request'] == "confirmEmail") {
    //make sure api call requirements are met.
    if (!isset($_GET['email']) || !isset($_GET['key'])) {
        if (!isset($_GET['email'])) {
            $neededParams[] = "Email Address";
        }
        if (!isset($_GET['key'])) {
            $neededParams[] = "Key";
        }
        $error = array('result' => 'false', 'message' => "Error: Missing required data. Please provide an email address and key", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //we have what we need to confirm the email address
    $user = new users();
    //first lets make sure that there is a need to confirm
    if(!$user->isWaitingConf($_GET['email'])){
        $error = array('result' => 'false', 'message' => "This email is not in the confirmation queue.");
        echo json_encode($error);
        return;
    }
    //there is an email match waiting, try to confirm.
    if (!$user->confirmEmail($_GET['email'], $_GET['key'])) {
        $result = array('result' => 'false', 'message' => "Unable to confirm the email address.");
        echo json_encode($result);
        return;
    }
    else {
        $result = array('result' => 'true', 'message' => "The account with email address: ". $_GET['email'] . " has been confirmed.");
        echo json_encode($result);
        return;
    }
}

//authorize user
if (isset($_GET['request']) && $_GET['request'] == "authUser") {
    //make sure api call requirements are met.
    if (!isset($_GET['email']) || !isset($_GET['password'])) {
        if (!isset($_GET['email'])) {
            $neededParams[] = "Email Address";
        }
        if (!isset($_GET['Password'])) {
            $neededParams[] = "Password";
        }
        $error = array('result' => 'false', 'message' => "Error: Missing required data. Please provide an email address and password", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //we have what we need to authorize the user
    $user = new users();
    //first lets make sure that there is a need to authorize
    //check to see if the email has been confirmed
    if($user->isWaitingConf($_GET['email'])){
        $error = array('result' => 'false', 'message' => "This email address still needs to be confirmed.");
        echo json_encode($error);
        return;
    }
    //check to see if the user is in the database
    if(!$user->isUser($_GET['email'])){
        $error = array('result' => 'false', 'message' => "This email is not associated with a valid account.");
        echo json_encode($error);
        return;
    }
    //there is a user with that email, and that email has been confirmed, try to authorize
    if (!$user->authUser($_GET['email'], $_GET['password'])) {
        $result = array('result' => 'false', 'message' => "Login failed: Email/Password mismatch.");
        echo json_encode($result);
        return;
    }
    else {
        $account['id'] = $user->getId();
        $account['name'] = $user->getName();
        $account['joinDate'] = $user->getJoinDate();
        $account['email'] = $user->getEmail();

        $result = array('result' => 'true', 'message' => "Success.", 'account_info' => $account);
        echo json_encode($result);
        return;
    }
}
?>