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
      `join_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
      `password` VARCHAR(255) NOT NULL , 
      PRIMARY KEY (`id`)
      ) ENGINE = MyISAM;";

    echo("Create users table...success<br>");
    if (!$link->query($create_users_table)) {
        die("Error creating user table: " . $link->error . " Fix this error and run setup.php again.");
    }
}

//next table...

//the tables are all setup, we can delete this file...
//tested and it is deleted if it makes it here.

if(unlink("./setup.php") && unlink("./setup.txt")) {

    echo("Setup file has been executed and deleted. Setup instructions have been deleted. You will now be redirected...");

?>

<meta http-equiv="refresh"  content="10;url=../">

<?php

}
else {

    echo("Unknown Error - Setup files were not deleted. ");

}

?>