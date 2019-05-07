<?php

//Include the database
include("db.php");

//check to see if databases tables are set up...if not create them and delete this file.
//create the tables if they don't already exist

//users table
$users_table_state = $link->query("SELECT * FROM information_schema.tables WHERE table_schema = 'jour_jour' AND table_name= 'jour_users' LIMIT 1");
if (!$users_table_state->num_rows) {
    //the user table does not exist, create it....
    $create_users_table = "CREATE TABLE `jour_jour`.`jour_users` ( 
      `id` INT(11) NOT NULL AUTO_INCREMENT ,
      `first_name` VARCHAR(25) NOT NULL , 
      `email` VARCHAR(60) NOT NULL , 
      `join_date` DATE NOT NULL , 
      `password` VARCHAR(255) NOT NULL ,
      `authKey` VARCHAR(255) NOT NULL ,
      PRIMARY KEY (`id`)
      ) ENGINE = MyISAM;";

    if (!$link->query($create_users_table)) {
        die("Error creating user table: " . $link->error . " Fix this error and run setup.php again.");
    }
    echo("Create users table...success<br>");
}

//users table
$tasks_table_state = $link->query("SELECT * FROM information_schema.tables WHERE table_schema = 'jour_jour' AND table_name= 'jour_tasks' LIMIT 1");
if (!$tasks_table_state->num_rows) {
    //the tasks table does not exist, create it....
    $create_tasks_table = "CREATE TABLE `jour_jour`.`jour_tasks` ( 
      `id` INT(11) NOT NULL AUTO_INCREMENT ,
      `uid` INT(11) NOT NULL , 
      `task_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
      `task` VARCHAR(255) NOT NULL ,
      `completed` BOOLEAN NOT NULL DEFAULT 0,
      PRIMARY KEY (`id`)
      ) ENGINE = MyISAM;";

    if (!$link->query($create_tasks_table)) {
        die("Error creating tasks table: " . $link->error . " Fix this error and run setup.php again.");
    }
    echo("Create tasks table...success<br>");
}


//confirmation table
$conf_table_state = $link->query("SELECT * FROM information_schema.tables WHERE table_schema = 'jour_jour' AND table_name= 'jour_confirm' LIMIT 1");
if (!$conf_table_state->num_rows) {
    //the user table does not exist, create it....
    $create_confirm_table = "CREATE TABLE `jour_jour`.`jour_confirm` ( 
      `id` INT(11) NOT NULL AUTO_INCREMENT ,
      `first_name` VARCHAR(25) NOT NULL , 
      `email` VARCHAR(60) NOT NULL , 
      `password` VARCHAR(255) NOT NULL , 
      `email_hash` VARCHAR(255) NOT NULL , 
      `expire` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
      PRIMARY KEY (`id`)
      ) ENGINE = MyISAM;";

    if (!$link->query($create_confirm_table)) {
        die("Error creating confirmation table: " . $link->error . " Fix this error and run setup.php again.");
    }
    echo("Create email confirmation table...success<br>");

}

//journals table
$journals_table_state = $link->query("SELECT * FROM information_schema.tables WHERE table_schema = 'jour_jour' AND table_name= 'jour_journals' LIMIT 1");
if (!$journals_table_state->num_rows) {
    //the user table does not exist, create it....
    $create_journals_table = "CREATE TABLE `jour_jour`.`jour_journals` ( 
      `id` INT(22) NOT NULL AUTO_INCREMENT ,
      `uid` INT(11) NOT NULL ,
      `mood` VARCHAR(50) NOT NULL , 
      `journal` VARCHAR(255) NOT NULL , 
      `postDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
      `editDate` TIMESTAMP NULL DEFAULT NULL ,
      PRIMARY KEY (`id`)
      ) ENGINE = MyISAM;";

    if (!$link->query($create_journals_table)) {
        die("Error creating journals table: " . $link->error . " Fix this error and run setup.php again.");
    }
    echo("Create journals table...success<br>");

}


//the tables are all setup, we can delete this file...
//tested and it is deleted if it makes it here.

if (unlink("./setup.php") && unlink("./setup.txt")) {

    echo("Setup file has been executed and deleted. Setup instructions have been deleted. You will now be redirected...");

    ?>

    <meta http-equiv="refresh" content="10;url=../">

    <?php

} else {

    echo("Unknown Error - Setup files were not deleted. ");

}

?>