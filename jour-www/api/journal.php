<?php

class journal
{

    private $id;
    private $uid;
    private $journal;
    private $mood;
    private $postDate;
    private $link;
    private $journalLengthMin = 1;
    private $journalLengthMax = 140;


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
        $stmt->bind_param('iss', $uid, $journal, $mood);
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

        //make sure that this user owns this journal
        if (!$stmt = $link->prepare("SELECT * FROM jour_journals WHERE id = ? and uid = ?")) {

           return false;

        }

        $stmt->bind_param('ii', $id, $uid);
        if (!$stmt->execute()) {

            //there was an error updating the journal
            return false;

        }

        $stmt = $stmt->get_result();
        if (!$stmt->num_rows) {

            //there was an error updating the journal
            return false;
        }

        //everything is good, update the journal and mood to the database
        if (!$stmt = $link->prepare("UPDATE jour_journals set mood = ?, journal = ?, editDate = current_timestamp  WHERE id = ? and uid = ?")) {

            return false;

        }
        $stmt->bind_param('ssii', $mood, $journal, $id, $uid);
        if (!$stmt->execute()) {


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

    function deleteJournal($uid, $id)
    {

        //delete a journal entry by its id

        //get database link
        $link = $this->getLink();

        //make sure that this user owns this journal
        if (!$stmt = $link->prepare("SELECT * FROM jour_journals WHERE id = ? and uid = ?")) {

            return false;

        }

        $stmt->bind_param('ii', $id, $uid);
        if (!$stmt->execute()) {

            //there was an error updating the journal
            return false;

        }

        $stmt = $stmt->get_result();
        if (!$stmt->num_rows) {

            //there was an error updating the journal
            return false;
        }

        //everything is good, delete the journal and mood from the database
        if (!$stmt = $link->prepare("DELETE from jour_journals where id = ? AND uid = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param('ii', $id, $uid);
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

    function getJournalsByDate($uid, $date)
    {

        //get database link
        $link = $this->getLink();

        //date must be in yyyy-mm-dd format. for example march 27th, 2019 = 2019-03-27

        //grab all the journals by date
        if (!$stmt = $link->prepare("SELECT * FROM jour_journals WHERE uid = ? and DATE(postDate) = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param('is', $uid, $date);
        if (!$stmt->execute()) {

            //there was an error grabbing the journals
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            $result = $stmt->get_result();

            $journals[] = array();
            $i = 0;
            while ($row = $result->fetch_assoc()) {

                $journals[$i] = $row;
                $i++;

            }
            $result = $journals;
        }

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;

    }

    function getJournalsByYearWeek($uid, $date)
    {

        //get database link
        $link = $this->getLink();

        //date must be in yyyy-mm-dd format. for example march 27th, 2019 = 2019-03-27

        //grab all the journals by week of the year
        if (!$stmt = $link->prepare("SELECT * FROM jour_journals WHERE uid = ? and YEARWEEK(postDate) = YEARWEEK(?)")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param('is', $uid, $date);
        if (!$stmt->execute()) {

            //there was an error grabbing the journals
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            $result = $stmt->get_result();

            if ($result->num_rows) {

                $journals[] = array();
                $i = 0;
                while ($row = $result->fetch_assoc()) {

                    $journals[$i] = $row;
                    $i++;

                }
                $result = $journals;

            }
            else {

                $result = false;

            }

        }

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;

    }


    function checkJournalLength($journal)
    {

        //make sure the journal entry and mood are set according to rules we create at some point.
        if (strlen($journal) < $this->journalLengthMin || strlen($journal) > $this->journalLengthMax) {

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