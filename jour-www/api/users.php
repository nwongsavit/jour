<?php

class users
{
    private $id;
    private $email;
    private $name;
    private $joinDate;
    private $link;

    public function __construct()
    {
        //nothing needs to go here.
    }

    function getLink()
    {

        //get and return the database link...
        require("db.php");
        $this->link = $link;
        return $link;

    }

    function isUser($email)
    {
        $link = $this->getLink();
        //check to see if the user is already registered,
        if (!$stmt = $link->prepare("SELECT id FROM jour_users WHERE email = ?")) {
            echo("ERROR:" . $link->error);
            die();
        }
        $stmt->bind_param(s, $email);
        $stmt->execute();
        $stmt = $stmt->get_result();
        //if there are any rows the user already has an account.
        if ($stmt->num_rows) {
            $result = true;
        } else {
            $result = false;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function isWaitingConf($email)
    {
        $link = $this->getLink();
        //check to see if the user is already registered
        if (!$stmt = $link->prepare("SELECT id FROM jour_confirm WHERE email = ?")) {
            echo("ERROR:" . $link->error);
            die();
        }
        $stmt->bind_param(s, $email);
        $stmt->execute();
        $stmt = $stmt->get_result();
        //if there are any rows the user already has an account.
        if ($stmt->num_rows) {
            $result = true;
        } else {
            $result = false;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function registerUser($email, $name, $password)
    {
        $link = $this->getLink();
        //check to see if the user is already registered,
        //if the user is already waiting confirmation, do not readd, just give success and the email will be sent via api call.

        if (!$stmt = $link->prepare("INSERT into jour_confirm (email, first_name, password, email_hash) VALUES (?,?,?,?)")) {
            echo("ERROR:" . $link->error);
            die();
        }

        //http://php.net/manual/en/function.password-hash.php
        //info on the password hashing
        $password = password_hash($_GET['password'], PASSWORD_DEFAULT);
        $email_hash = password_hash($_GET['email'], PASSWORD_DEFAULT);
        $stmt->bind_param(ssss, $email, $name, $password, $email_hash);
        if (!$stmt->execute()) {
            $result = false;
        } else {
            //the user has been registered. send the email
            //and return the true result
            //try and send the confirmation email...
            $this->sendConfEmail($_GET['email']);
            $result = true;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function confirmEmail($email, $conf_hash)
    {
        $link = $this->getLink();
        //delete all accounts that have not been confirmed in 5 days
        if (!$stmt = $link->prepare("DELETE FROM jour_confirm WHERE TIMESTAMPDIFF(DAY ,expire,CURRENT_TIMESTAMP()) > 5")) {
            echo("ERROR:" . $link->error);
            die();
        }
        $stmt->execute();

        //check to see if the user is already registered
        if (!$stmt = $link->prepare("SELECT * FROM jour_confirm WHERE email = ? AND email_hash = ? LIMIT 1")) {
            echo("ERROR:" . $link->error);
            die();
        }
        $stmt->bind_param(ss, $email, $conf_hash);
        $stmt->execute();
        $stmt = $stmt->get_result();
        //if there are any rows the user already has an account.
        if ($stmt->num_rows) {
            //there is a match..lets move the user to the users table and erase them from the confirmation
            $row = $stmt->fetch_assoc();
            //just double check that the email provided hashes out to the same as the data grabbed from the database
            if (!password_verify($_GET['email'], $row['email_hash'])) {
                return false;
            } else {
                //we have a match, make the transfer and delete the entry
                if (!$stmt = $link->prepare("INSERT INTO jour_users (first_name, email, join_date, password) VALUES (?,?,?,?)")) {
                    echo("ERROR:" . $link->error);
                    die();
                }
                //mysql date format 'YYYY-MM-DD'
                //lets set default timezone for las vegas
                date_default_timezone_set('America/Los_Angeles');
                $join_date = date('Y-m-d');
                $stmt->bind_param(ssss, $row['first_name'], $row['email'], $join_date, $row['password']);
                if (!$stmt->execute()) {
                    //there was an error during the transfer
                    echo("ERROR:" . $link->error);
                    $result = false;
                } else {
                    //the user has been registered. now we need to delete the user from the confirmation table
                    if (!$stmt = $link->prepare("DELETE FROM jour_confirm where id = ?")) {
                        echo("ERROR:" . $link->error);
                        die();
                    }
                    //mysql date format 'YYYY-MM-DD'
                    //lets set default timezone for las vegas

                    $stmt->bind_param(i, $row['id']);
                    if (!$stmt->execute()) {
                        //there was an error during the transfer
                        echo("ERROR:" . $link->error);
                        $result = false;
                    } else {
                        //the user has been registered. now we need to delete the user from the confirmation table
                        $result = true;
                    }
                }
            }
        } else {
            $result = false;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function sendConfEmail($email)
    {
        $link = $this->getLink();
        //get key for confirmation from the database
        if (!$stmt = $link->prepare("SELECT email_hash FROM jour_confirm WHERE email = ? LIMIT 1")) {
            echo("ERROR:" . $link->error);
            die();
        }

        $stmt->bind_param(s, $email);
        $stmt->execute();
        $stmt = $stmt->get_result();

        while ($row = $stmt->fetch_assoc()) {
            $key[] = $row['email_hash'];
        }

        $to = $email;
        $subject = "Account Confirmation";
        $message = '<html><body>';
        $message .= '<h1>Confirm Your Account</h1>';
        $message .= "<a href=https://jour.life/confirm?email=$_GET[email]&emailKey=$key[0]>Confirm your account</a>";
        $message .= '</body></html>';
        $headers = "From: no-reply@jour.life " . "\r\n";
        $headers .= "Reply-To: no-reply@jour.life " . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        if (!mail($to, $subject, $message, $headers)) {
            return false;
        } else {
            return true;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function authUser($email, $password)
    {
        //get the database link
        $link = $this->getLink();

        //check for email/password match, and if so, set all private vars.

        //get the users data so we can check the password
        if (!$stmt = $link->prepare("SELECT * FROM jour_users WHERE email = ? LIMIT 1")) {
            echo("ERROR GETTING USER DATA:" . $link->error);
            die();
        }
        $stmt->bind_param(s, $email);
        $stmt->execute();
        $stmt = $stmt->get_result();
        //if there are any rows we have a user with that email, now we check to see if the password hashes match
        if ($stmt->num_rows) {
            //set the row as associative array
            $row = $stmt->fetch_assoc();
            //just double check that the email provided hashes out to the same as the data grabbed from the database
            if (!password_verify($password, $row['password'])) {
                //no match return false
                return false;
            } else {
              //they have provided correct credentials, set private vars and return true
              $this->joinDate = $row['join_date'];
              $this->name = $row['first_name'];
              $this->email = $row['email'];
              $this->id = $row['id'];
              return true;
            }
        } else {
            $result = false;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function resetPassword($email, $auth_hash)
    {


    }

    function getId()
    {

        return $this->id;

    }

    function getEmail()
    {

        return $this->email;

    }

    function getName()
    {

        return $this->name;

    }

    function getJoinDate()
    {

        return $this->joinDate;

    }
}

?>