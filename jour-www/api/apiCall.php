<?php

include ('users.php');
include ('journal.php');

class apiCall
{

    public $key;
    public $call;
    public $args;
    private $message;
    private $result;
    private $neededParams;
    private $link;

    public function __construct($args)
    {

        if (isset($args['key']) && isset($args['request'])) {

            $this->key = $args['key'];
            unset($args["key"]);
            $this->call = $args['request'];
            unset($args["request"]);

        }
        else {

            $this->neededParams = $this->checkParams(array('key', 'request'), $args);
            $this->result = false;
            $this->message = "Error: Missing parameters. Missing Parameters: " . implode(', ', $this->neededParams);
            $this->sendResult($this->result, $this->message);
            die();
        }

        $this->args = $args;
    }

    function getLink()
    {

        //get and return the database link...
        require("db.php");
        $this->link = $link;
        return $link;

    }

    function checkParams($neededParams, $args) {

        $needed = array();

        foreach ($neededParams as $vals) {

            if (!isset($args[$vals])) {
                $needed[] = $vals;
            }

        }

        return $needed;
    }

    function dispGet()
    {

        var_dump($this->args);

    }

    function sendResult($r, $m) {

        $result = array('result' => $r, 'message' => $m);
        echo json_encode($result);
        return;

    }

    function checkApiKey($k) {

       include('db.php');
       if ($k != $api_key) {

           $this->result = false;
           $this->message = "ERROR: Provided key is invalid.";
           $this->sendResult($this->result, $this->message);
           die();

       }

    }

    function isUser($args) {

        $needed = $this->checkParams(array('email'), $args);
        if (!empty($needed)) {

            $this->result = false;
            $this->message = "ERROR: Missing Parameter. Needed: email.";
            $this->sendResult($this->result, $this->message);
            die();

        }

        //we have what we need to see if the user already exists, make the check.
        $user = new users();
        if (!$user->isUser($args['email'])) {

            $this->result = false;

        }
        else {

            $this->result = true;

        }

    }

    function isWaitingConf($args) {

        $needed = $this->checkParams(array('email'), $args);
        if (!empty($needed)) {

            $this->result = false;
            $this->message = "ERROR: Missing Parameter. Needed: email.";
            $this->sendResult($this->result, $this->message);
            die();

        }

        //we have what we need to see if the user already exists, make the check.
        $user = new users();
        if (!$user->isWaitingConf($args['email'])) {

            $this->result = false;

        }
        else {

            $this->result = true;

        }

    }

    function registerUser($args) {

        $needed = $this->checkParams(array('email', 'name', 'password'), $args);
        if (!empty($needed)) {

            $this->result = false;
            $this->message = "ERROR: Missing Parameter. Needed: " . implode(', ', $needed) . ".";
            $this->sendResult($this->result, $this->message);
            die();

        }

        //check to make sure the data is valid.
        if (!filter_var($args['email'], FILTER_VALIDATE_EMAIL)) {

            $this->result = false;
            $this->message = "ERROR: The email address provided is not valid.";
            $this->sendResult($this->result, $this->message);
            die();

        }

        $password = $args['password'];
        if(!preg_match('/^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_%^&+\=\*$! \?]{8,80}$/',$password)) {
            //password does not meet requirements
            /*requirements
                Characters: 8-80
                1 capital letter
                1 number
                1 symbol (@#-_$%^&+=!?* space)
            */
            $this->result = false;
            $this->message = "ERROR: The password provided doesn't meet requirements.";
            $this->sendResult($this->result, $this->message);
            die();

        }

        $this->isWaitingConf($args);
        if ($this->result) {

            $this->result = false;
            $this->message = "ERROR: This email address is awaiting confirmation.";
            $this->sendResult($this->result, $this->message);
            die();

        }

        $this->isUser($args);
        if ($this->result) {

            $this->result = false;
            $this->message = "ERROR: This email address is already associated with an account.";
            $this->sendResult($this->result, $this->message);
            die();

        }

        //  We can now try to register the user.
        $user = new users();
        if (!$user->registerUser($args['email'], $args['name'], $args['password'])) {

            $this->result = false;
            $this->message = "ERROR: The account was not created.";
            $this->sendResult($this->result, $this->message);
            die();

        }
        else {

            $this->result = true;
            $this->message = "Account creation for " . $args['email'] . " is pending confirmation.";
            $this->sendResult($this->result, $this->message);
            die();

        }

    }

}

?>