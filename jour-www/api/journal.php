<?php

class journal
{

    private $id;
    private $uid;
    private $journal;
    private $mood;
    private $postDate;
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

    function addJournal($uid, $journal, $mood)
    {

        //get database link
        $link = $this->getLink();


        //check the journal length
        if (!$this->checkJournalLength($journal)) {

            $result = false;
            return $result;

        }

        //check the mood
        if (!$this->checkMood($mood)) {

            $result = false;
            return $result;

        }

        //everything is good, add the journal and mood to the database
        if (!$stmt = $link->prepare("INSERT INTO jour_journals (uid, journal, mood) VALUES (?,?,?)")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param(iss, $uid, $journal, $mood);
        if (!$stmt->execute()) {

            //there was an error adding the journal
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            //the journal was added
            $result = true;

        }

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function editJournal($uid, $id, $journal, $mood)
    {

        //get database link
        $link = $this->getLink();

        //check the journal length
        if (!$this->checkJournalLength($journal)) {

            $result = false;
            return $result;

        }

        //check the mood
        if (!$this->checkMood($mood)) {

            $result = false;
            return $result;

        }

        //everything is good, update the journal and mood to the database
        if (!$stmt = $link->prepare("UPDATE jour_journals set mood = ?, journal = ?, editDate = current_timestamp  WHERE id = ? and uid = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param(iss, $uid, $journal, $mood);
        if (!$stmt->execute()) {

            //there was an error updating the journal
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            //the journal was updated
            $result = true;

        }

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function deleteJournal($uid, $id, $authKey)
    {

        //delete a journal entry by its id

        //get database link
        $link = $this->getLink();

        //everything is good, delete the journal and mood from the database
        if (!$stmt = $link->prepare("DELETE from jour_journals where id = ? AND uid = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param(ii, $id, $uid);
        if (!$stmt->execute()) {

            //there was an error updating the journal
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            //the journal was deleted
            $result = true;

        }

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function getJournals($uid, $authKey)
    {

        //get database link
        $link = $this->getLink();

        //everything is good, grab the journals.
        if (!$stmt = $link->prepare("SELECT id, mood, postDate, editDate FROM jour_journals WHERE uid = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param(i, $uid);
        if (!$stmt->execute()) {

            //there was an error grabbing the journals
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            //the journal was updated
            $result = $stmt->fetch_assoc();

        }

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;

    }


    function checkJournalLength($journal)
    {

        //make sure the journal entry and mood are set according to rules we create at some point.
        if (strlen($journal) == 0 || strlen($journal) > 160) {

            return false;

        } else {

            return true;

        }

    }

    function checkMood($mood)
    {

        //make sure the journal entry and mood are set according to rules we create at some point.
        if (strlen($mood) == 0 || strlen($mood) > 25) {

            return false;

        } else {

            return true;

        }

    }

}

?>