<?php


class tasks
{

    private $id;
    private $userId;
    private $task;
    private $link;
    private $completed;
    private $date;

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

    function addTasks($uid, $tasks) {

        $link = $this->getLink();
        $result = false;
        // add the tasks

        foreach ($tasks as $t) {

            if (!$stmt = $link->prepare("insert into jour_tasks (uid, task) VALUES (?, ?)")) {
                echo("ERROR:" . $link->error);
                die();
            }

            $stmt->bind_param('is', $uid, $t);

            if(!$stmt->execute()) {

                $result = false;
                break;

            }
            else {

                $result = true;
            }

        }

        return $result;

    }

    function toggleTaskCompleted($uid, $tid) {

        $link = $this->getLink();

        // update the task completed value
        if (!$stmt = $link->prepare("update jour_tasks set completed = !completed where id = ? and uid = ?")) {
            echo("ERROR:" . $link->error);
            die();
        }

        $stmt->bind_param('ii', $tid, $uid);

        if(!$stmt->execute()) {

            $result = false;

        }
        else {

            $result = true;
        }

        return $result;

    }

    function getTasksByYearWeek($uid, $date)
    {

        //get database link
        $link = $this->getLink();

        //date must be in yyyy-mm-dd format. for example march 27th, 2019 = 2019-03-27

        //grab all the tasks by week of the year
        if (!$stmt = $link->prepare("SELECT * FROM jour_tasks WHERE uid = ? and YEARWEEK(task_date) = YEARWEEK(?)")) {

            echo("ERROR:" . $link->error);
            die();

        }
        $stmt->bind_param('is', $uid, $date);
        if (!$stmt->execute()) {

            //there was an error grabbing the tasks
            echo("ERROR:" . $link->error);
            $result = false;

        } else {

            $result = $stmt->get_result();

            if ($result->num_rows) {

                $tasks[] = array();
                $i = 0;
                while ($row = $result->fetch_assoc()) {

                    $tasks[$i] = $row;
                    $i++;

                }
                $result = $tasks;

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

    function getTasksByDate($uid, $date)
    {

        //get database link
        $link = $this->getLink();

        //date must be in yyyy-mm-dd format. for example march 27th, 2019 = 2019-03-27

        //grab all the journals by date
        if (!$stmt = $link->prepare("SELECT * FROM jour_tasks WHERE uid = ? and DATE(task_date) = ?")) {

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

                $tasks[] = array();
                $i = 0;
                while ($row = $result->fetch_assoc()) {

                    $tasks[$i] = $row;
                    $i++;

                }
                $result = $tasks;

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

}

?>