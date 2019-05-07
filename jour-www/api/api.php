<?php

//jour api
//requires PHP 7.3 or higher


//Set the headers to allow api to communicate cross browser from local machines during development.
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//include necessary files.
include('db.php');
include('users.php');
include('journal.php');
include ('tasks.php');

//jour API

//make sure link is set, if not send false result.
if (!isset($link)) {
    $error = array('result' => false, 'message' => "Error: couldn't get the database information.");
    echo json_encode($error);
    return;
}

//check to make sure the api key is a valid key. currently only one key, but this can be expanded in the future
//$api_key is defined in config.php
if (!isset($_GET['key']) || $_GET['key'] != $api_key) {
    $error = array('result' => false, 'message' => "Error: API key is missing on invalid.");
    echo json_encode($error);
    return;
}


//error if no request is made and send the result.
if (!isset($_GET['request'])) {
    $error = array('result' => false, 'message' => "Error: Request required.");
    echo json_encode($error);
    return;
}


//**********************************************USER RELATED API CALLS*************************************************************


//check to see if the email address is already in the users database.
if (isset($_GET['request']) && $_GET['request'] == "isUser") {
    //make sure api call requirements are met.
    if (!isset($_GET['email'])) {
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address.");
        echo json_encode($error);
        return;
    }
    //we have what we need to see if the user already exists, make the check.
    $user = new users();
    if (!$user->isUser($_GET['email'])) {
        $result = array('result' => false, 'message' => "No associated user.");
        echo json_encode($result);
        return;
    } else {
        $result = array('result' => true, 'message' => "An account with email address: " . $_GET['email'] . " already exists.");
        echo json_encode($result);
        return;
    }
}
//check to see if the email address is waiting to be confirmed.
if (isset($_GET['request']) && $_GET['request'] == "isWaitingConf") {
    //make sure api call requirements are met.
    if (!isset($_GET['email'])) {
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address.");
        echo json_encode($error);
        return;
    }
    //we have what we need to see if the user already exists, make the check.
    $user = new users();
    if (!$user->isWaitingConf($_GET['email'])) {
        $result = array('result' => false, 'message' => "No associated email is waiting confirmation.");
        echo json_encode($result);
        return;
    } else {
        $result = array('result' => true, 'message' => "An account with email address: " . $_GET['email'] . " is waiting for confirmation.");
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
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address, name, and password.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //check to make sure the data is valid.
    if (!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)) {
        $error = array('result' => false, 'message' => "Error: The email address provided is not valid.");
        echo json_encode($error);
        return;
    }

    $password = $_GET['password'];
    if (!preg_match('/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_%^&+\=\*$! \?]{8,80}$/', $password)) {
        //password does not meet requirements
        /*requirements
            Characters: 8-80
            1 capital letter
            1 number
            1 symbol (@#-_$%^&+=!?* space)
        */
        $error = array('result' => false, 'message' => "Error: The password provided doesn't meet requirements.");
        echo json_encode($error);
        return;
    }
    //we have what we need to see if the user already exists, make the check.
    $user = new users();
    //lets double check and make sure that this email address isn't already taken.
    if ($user->isUser($_GET['email'])) {
        $error = array('result' => false, 'message' => "Error: The email address provided is already associated with an account.");
        echo json_encode($error);
        return;
    }
    //check to make sure the user isn't already in the queue for confirmation
    if ($user->isWaitingConf($_GET['email'])) {
        $error = array('result' => false, 'message' => "This email is already awaiting confirmation.");
        echo json_encode($error);
        return;
    }
    if (!$user->registerUser($_GET['email'], $_GET['name'], $_GET['password'])) {
        $error = array('result' => false, 'message' => "The account was not created.");
        echo json_encode($error);
        return;
    } else {
        $result = array('result' => true, 'message' => "Account creation for " . $_GET['email'] . " is pending confirmation.");
        echo json_encode($result);
        return;
    }
}

//confirm the users email address
if (isset($_GET['request']) && $_GET['request'] == "confirmEmail") {
    //make sure api call requirements are met.
    if (!isset($_GET['email']) || !isset($_GET['emailKey'])) {
        if (!isset($_GET['email'])) {
            $neededParams[] = "Email Address";
        }
        if (!isset($_GET['emailKey'])) {
            $neededParams[] = "emailKey";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address and key", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //we have what we need to confirm the email address
    $user = new users();
    //first lets make sure that there is a need to confirm
    if (!$user->isWaitingConf($_GET['email'])) {
        $error = array('result' => false, 'message' => "This email is not in the confirmation queue.");
        echo json_encode($error);
        return;
    }
    //there is an email match waiting, try to confirm.
    if (!$user->confirmEmail($_GET['email'], $_GET['emailKey'])) {
        $result = array('result' => false, 'message' => "Unable to confirm the email address.");
        echo json_encode($result);
        return;
    } else {
        $result = array('result' => true, 'message' => "The account with email address: " . $_GET['email'] . " has been confirmed.");
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
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address and password", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //we have what we need to authorize the user
    $user = new users();
    //first lets make sure that there is a need to authorize
    //check to see if the email has been confirmed
    if ($user->isWaitingConf($_GET['email'])) {
        $error = array('result' => false, 'message' => "This email address still needs to be confirmed.");
        echo json_encode($error);
        return;
    }
    //check to see if the user is in the database
    if (!$user->isUser($_GET['email'])) {
        $error = array('result' => false, 'message' => "This email is not associated with a valid account.");
        echo json_encode($error);
        return;
    }
    //there is a user with that email, and that email has been confirmed, try to authorize
    if (!$user->authUser($_GET['email'], $_GET['password'])) {
        $result = array('result' => false, 'message' => "Login failed: Email/Password mismatch.");
        echo json_encode($result);
        return;
    } else {
        $account['id'] = $user->getId();
        $account['name'] = $user->getName();
        $account['joinDate'] = $user->getJoinDate();
        $account['email'] = $user->getEmail();
        $account['authKey'] = $user->getAuthKey();
        $result = array('result' => true, 'message' => "Success.", 'account_info' => $account);
        echo json_encode($result);
        return;
    }
}

if (isset($_GET['request']) && $_GET['request'] == "getUser") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }


    $user = new users();

    if (!$user->getUser($_GET['uid'])) {
        $error = array('result' => false, 'message' => "Error getting data for user id " . $_GET['uid'] . ".");
        echo json_encode($error);
        return;
    } else {
        $account['id'] = $user->getId();
        $account['name'] = $user->getName();
        $account['joinDate'] = $user->getJoinDate();
        $account['email'] = $user->getEmail();
        $account['authKey'] = $user->getAuthKey();
        $result = array('result' => true, 'message' => "Success.", 'account_info' => $account);
        echo json_encode($result);
        return;
    }
}

//api call for editing users email, name, and password. (Password is optional
if (isset($_GET['request']) && $_GET['request'] == "editUser") {

    //make sure api call requirements are met.
    if (!isset($_GET['email']) || !isset($_GET['name']) || !isset($_GET['uid']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['email'])) {
            $neededParams[] = "Email Address";
        }
        if (!isset($_GET['name'])) {
            $neededParams[] = "First Name";
        }
        if (!isset($_GET['uid'])) {
            $neededParams[] = "User Id";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address, name, authKey, and user id.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }

    //check to make sure the data is valid.
    if (!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)) {

        $error = array('result' => false, 'message' => "Error: The email address provided is not valid.");
        echo json_encode($error);
        return;

    }

    if (isset($_GET['password'])) {

        $password = $_GET['password'];
        if (!preg_match('/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_%^&+\=\*$! \?]{8,80}$/', $password)) {
            //password does not meet requirements
            /*requirements
                Characters: 8-80
                1 capital letter
                1 number
                1 symbol (@#-_$%^&+=!?* space)
            */
            $error = array('result' => false, 'message' => "Error: The password provided doesn't meet requirements.");
            echo json_encode($error);
            return;

        }
    }

    //we have what we need to see if the user already exists, make the check.
    $user = new users();

    //make sure the user exists.
    if (!$user->getUser($_GET['uid'])) {

        $error = array('result' => false, 'message' => "Error: User does not exist.");
        echo json_encode($error);
        return;

    }

    //auth the user...
    //check the auth key
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    //they are auth'd
    //get this users data
    $user->getUser($_GET['uid']);

    //check to make sure that the new email address is not in use by someone else.
    if ($user->getEmail() != $_GET['email']) {

        if ($user->isUser($_GET['email'])) {

            $error = array('result' => false, 'message' => "Error: The email address is already in use.");
            echo json_encode($error);
            return;

        }

        //check to make sure the user isn't already in the queue for confirmation
        if ($user->isWaitingConf($_GET['email'])) {

            $error = array('result' => false, 'message' => "This email is already awaiting confirmation for another user.");
            echo json_encode($error);
            return;

        }

    }

    if (!$user->editUser($_GET['uid'], $_GET['email'], $_GET['name'], $_GET['password'])) {

        $error = array('result' => false, 'message' => "The account edit could not be completed.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Account edit for " . $_GET['email'] . " was successful.");
        echo json_encode($result);
        return;

    }
}

if (isset($_GET['request']) && $_GET['request'] == "deleteUser") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }


    $user = new users();

    //make sure the user exists.
    if (!$user->getUser($_GET['uid'])) {

        $error = array('result' => false, 'message' => "Error: User does not exist.");
        echo json_encode($error);
        return;

    }

    //auth the user...
    //check the auth key
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    if (!$user->deleteUser($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Error deleting user with id " . $_GET['uid'] . ".");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success. Account with user id " . $_GET['uid'] . " deleted.");
        echo json_encode($result);
        return;

    }
}

//**********************************************END USER RELATED API CALLS*************************************************************


//**********************************************JOURNAL RELATED API CALLS**************************************************************

if ($_GET['request'] == "addJournal") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['journal']) || !isset($_GET['mood']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['journal'])) {
            $neededParams[] = "journal";
        }
        if (!isset($_GET['mood'])) {
            $neededParams[] = "mood";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide an email address and password", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $journal = new journal();

    //the user passed auth, check journal length
    if (!$journal->checkJournalLength($_GET['journal'])) {

        $error = array('result' => false, 'message' => "Journal length not valid.");
        echo json_encode($error);
        return;

    }
    //check the mood requirements...
    if (!$journal->checkMood($_GET['mood'])) {

        $error = array('result' => false, 'message' => "invalid mood.");
        echo json_encode($error);
        return;

    }
    //every thing checks out, add the journal.
    if (!$journal->addJournal($_GET['uid'], $_GET['journal'], $_GET['mood'])) {

        $error = array('result' => false, 'message' => "Unable to add journal entry.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success. Journal Added.");
        echo json_encode($result);
        return;

    }

}
if ($_GET['request'] == "editJournal") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['journal']) || !isset($_GET['mood']) || !isset($_GET['jid']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['journal'])) {
            $neededParams[] = "journal";
        }
        if (!isset($_GET['mood'])) {
            $neededParams[] = "mood";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['jid'])) {
            $neededParams[] = "jid";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, edited journal, mood, authKey, and journal id", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $journal = new journal();

    //the user passed auth, check journal length
    if (!$journal->checkJournalLength($_GET['journal'])) {

        $error = array('result' => false, 'message' => "Journal length not valid.");
        echo json_encode($error);
        return;

    }
    //check the mood requirements...
    if (!$journal->checkMood($_GET['mood'])) {

        $error = array('result' => false, 'message' => "invalid mood.");
        echo json_encode($error);
        return;

    }
    //every thing checks out, add the journal.
    if (!$journal->editJournal($_GET['uid'], $_GET['jid'], $_GET['journal'], $_GET['mood'])) {

        $error = array('result' => false, 'message' => "Unable to edit journal entry.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success. Journal Edited.");
        echo json_encode($result);
        return;

    }

}
if ($_GET['request'] == "deleteJournal") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['jid']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['jid'])) {
            $neededParams[] = "jid";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, edited journal, mood, authKey, and journal id", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $journal = new journal();

    //every thing checks out, add the journal.
    if (!$journal->deleteJournal($_GET['uid'], $_GET['jid'])) {

        $error = array('result' => false, 'message' => "Unable to delete journal entry.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success. Journal deleted.");
        echo json_encode($result);
        return;

    }

}
if ($_GET['request'] == "getJournalsByDate") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['date']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['date'])) {
            $neededParams[] = "date";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, date, and authKey.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $journal = new journal();

    //every thing checks out, add the journal.
    if (!$result = $journal->getJournalsByDate($_GET['uid'], $_GET['date'])) {

        $error = array('result' => false, 'message' => "No journals for this user on this date.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success.", 'journals' => $result);
        echo json_encode($result);
        return;

    }

}

if ($_GET['request'] == "getJournalsByYearWeek") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['date']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['date'])) {
            $neededParams[] = "date";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, date, and authKey.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $journal = new journal();

    //every thing checks out, add the journal.
    if (!$result = $journal->getJournalsByYearWeek($_GET['uid'], $_GET['date'])) {

        $error = array('result' => false, 'message' => "No journals for this user on this week.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success.", 'journals' => $result);
        echo json_encode($result);
        return;

    }

}

//**********************************************END JOURNAL RELATED API CALLS********************************************************


//**********************************************TASKS RELATED API CALLS**************************************************************

if ($_GET['request'] == "addTasks") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['authKey']) || !isset($_GET['tasks'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['tasks'])) {
            $neededParams[] = "tasks";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, tasks, and authKey.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }

    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $tasks = new tasks();

    //every thing checks out, add the journal.
    if (!$result = $tasks->addTasks($_GET['uid'], $_GET['tasks'])) {

        $error = array('result' => false, 'message' => "Error. Could not add tasks.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success. Tasks added.");
        echo json_encode($result);
        return;

    }

}

if ($_GET['request'] == "toggleTasksCompleted") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['tid']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['tid'])) {
            $neededParams[] = "task id";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, task id, and authKey.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }

    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $tasks = new tasks();

    //every thing checks out, add the journal.
    if (!$result = $tasks->toggleTaskCompleted($_GET['uid'], $_GET['tid'])) {

        $error = array('result' => false, 'message' => "Error. Could not toggle the task completed value.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success. Task completed value was changed.");
        echo json_encode($result);
        return;

    }

}

if ($_GET['request'] == "getTasksByYearWeek") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['date']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['date'])) {
            $neededParams[] = "date";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, date, and authKey.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $tasks = new tasks();

    //every thing checks out, grab the tasks.
    if (!$result = $tasks->getTasksByYearWeek($_GET['uid'], $_GET['date'])) {

        $error = array('result' => false, 'message' => "No tasks for this user on this week.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success.", 'tasks' => $result);
        echo json_encode($result);
        return;

    }

}

if ($_GET['request'] == "getTasksByDate") {
    //make sure api call requirements are met.
    if (!isset($_GET['uid']) || !isset($_GET['date']) || !isset($_GET['authKey'])) {
        if (!isset($_GET['uid'])) {
            $neededParams[] = "uid";
        }
        if (!isset($_GET['authKey'])) {
            $neededParams[] = "authKey";
        }
        if (!isset($_GET['date'])) {
            $neededParams[] = "date";
        }
        $error = array('result' => false, 'message' => "Error: Missing required data. Please provide user id, date, and authKey.", 'needed' => $neededParams);
        echo json_encode($error);
        return;
    }
    //all required params have been provided.
    //auth the user...
    //check the auth key
    $user = new users();
    if (!$user->confirmAuthKey($_GET['uid'], $_GET['authKey'])) {

        $error = array('result' => false, 'message' => "Unable to authenticate user.");
        echo json_encode($error);
        return;

    }

    $tasks = new tasks();

    //every thing checks out, grab the tasks.
    if (!$result = $tasks->getTasksByDate($_GET['uid'], $_GET['date'])) {

        $error = array('result' => false, 'message' => "No tasks for this user on this date.");
        echo json_encode($error);
        return;

    } else {

        $result = array('result' => true, 'message' => "Success.", 'tasks' => $result);
        echo json_encode($result);
        return;

    }

}
?>