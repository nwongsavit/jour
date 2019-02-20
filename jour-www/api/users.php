<?php

class users
{
    private $id;
    private $email;
    private $name;
    private $password;
    private $joinDate;
    private $link;

    public function __construct(){
        //nothing needs to go here.
    }

    function getLink() {

        //get and return the database link...
        require("db.php");
        $this->link = $link;
        return $link;

    }

    function isUser($email) {
        $link = $this->getLink();
        //check to see if the user is already registered,
        $stmt = $link->prepare("SELECT id FROM jour_users WHERE email = ?");
        $stmt->bind_param(s,$email);
        $stmt->execute();
        $stmt = $stmt->get_result();
        //if there are any rows the user already has an account.
        if ($stmt->num_rows) {
            $result = true;
        }
        else {
            $result = false;
        }
        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

   function  registerUser($email, $name, $password) {
       $link = $this->getLink();
       //check to see if the user is already registered,
       $stmt = $link->prepare("INSERT into jour_users (email, first_name, password) VALUES (?,?,?)");
       //http://php.net/manual/en/function.password-hash.php
       //info on the password hashing
       $password = password_hash($_GET['password'], PASSWORD_DEFAULT);
       $stmt->bind_param(sss,$email,$name,$password);
       if (!$stmt->execute()) {
           $result = false;
       }
       else {
           $result = true;
       }
       //close the stmt and the link and return the result
       $stmt->close();
       $link->close();
       return $result;
   }

   function authUser($email, $password) {

       //check for email/password match, and if so, set all private vars.

   }

   function resetPassword($email, $auth_hash) {


   }

   function getId() {

       return $this->id;

   }

   function getEmail() {

        return $this->email;

   }

   function getName() {

       return $this->name;

   }

   function getJoinDate() {

       return $this->joinDate;

   }
}

?>