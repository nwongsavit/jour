<?php


class stats
{

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

    function getStatsByYearWeek($uid, $date) {

        //get database link
        $link = $this->getLink();

        $stats = array();


        //moods
        if (!$stmt = $link->prepare("SELECT mood, count(*) FROM jour_journals WHERE uid = ? and YEARWEEK(postDate) = YEARWEEK(?) group by mood  ")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('is', $uid, $date);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {

            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

            $result[] = $row;

            }

        }

        $stats['moods'] = $result;
        unset($result);

        //journals
        if (!$stmt = $link->prepare("SELECT count(*) FROM jour_journals WHERE uid = ? and YEARWEEK(postDate) = YEARWEEK(?) ")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('is', $uid, $date);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {



            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['journals'] = $result;
        unset($result);

        //tasks
        if (!$stmt = $link->prepare("SELECT completed, count(*) FROM jour_tasks WHERE uid = ? and YEARWEEK(task_date) = YEARWEEK(?) group by completed")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('is', $uid, $date);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {



            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['tasks'] = $result;
        unset($result);

        $result = $stats;

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function getStatsAllTime($uid) {

        //get database link
        $link = $this->getLink();

        $stats = array();


        //moods
        if (!$stmt = $link->prepare("SELECT mood, count(*) FROM jour_journals WHERE uid = ? group by mood")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('i', $uid);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {

            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['moods'] = $result;
        unset($result);

        //journals
        if (!$stmt = $link->prepare("SELECT count(*) FROM jour_journals WHERE uid = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('i', $uid);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {



            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['journals'] = $result;
        unset($result);

        //tasks
        if (!$stmt = $link->prepare("SELECT completed, count(*) FROM jour_tasks WHERE uid = ? group by completed")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('i', $uid);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {



            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['tasks'] = $result;
        unset($result);

        $result = $stats;

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

    function getStatsByDate($uid, $date) {

        //get database link
        $link = $this->getLink();

        $stats = array();


        //moods
        if (!$stmt = $link->prepare("SELECT mood, count(*) FROM jour_journals WHERE uid = ?  and DATE(postDate) = ? group by mood")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('is', $uid, $date);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {

            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['moods'] = $result;
        unset($result);

        //journals
        if (!$stmt = $link->prepare("SELECT count(*) FROM jour_journals WHERE uid = ? and DATE(postDate) = ?")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('is', $uid, $date);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {



            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['journals'] = $result;
        unset($result);

        //tasks
        if (!$stmt = $link->prepare("SELECT completed, count(*) FROM jour_tasks WHERE uid = ? and DATE(task_date) = ? group by completed")) {

            echo("ERROR:" . $link->error);
            die();

        }

        $stmt->bind_param('is', $uid, $date);

        if(!$stmt->execute()) {

            echo("ERROR:" . $link->error);
            $result = false;
            return $result;

        }
        else {



            $res = $stmt->get_result();


            while ($row = mysqli_fetch_assoc($res))  {

                $result[] = $row;

            }

        }

        $stats['tasks'] = $result;
        unset($result);

        $result = $stats;

        //close the stmt and the link and return the result
        $stmt->close();
        $link->close();
        return $result;
    }

}

?>