<?php

include('apiCall.php');

$apiCall = new apiCall($_GET);
$apiCall->checkApiKey($apiCall->key);


//  switch through all possible requests.
switch ($apiCall->call) {

    case 'isUser':
        //  returns true or false
        //  this will probably only be used in other api calls. Pending Deletion.
        $apiCall->isUser($apiCall->args);
        break;

    case 'isWaitingConf':
        //  returns true or false
        //  this will probably only be used in other api calls. Pending Deletion.
        $apiCall->isWaitingConf($apiCall->args);
        break;

    case 'registerUser':
        //  returns true or false
        $apiCall->registerUser($apiCall->args);
        break;

    default:
        echo 'unknownrequest';
        break;

}

?>