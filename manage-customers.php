<?php
/**
 * Created by IntelliJ IDEA.
 * User: Chanuka Sandaruwan
 * Date: 3/2/2018
 * Time: 7:43 PM
 */

include "connection.php";
$customerAction=$_POST["cAction"];
$id = $_POST["cid"];
$name = $_POST["cname"];
$address = $_POST["caddress"];
$salary = $_POST["csalary"];


if($customerAction==null){
    //echo "cust";
    if ($connection) {
        $rowsData = $connection->query("SELECT * FROM Customer")->fetch_all();
        echo json_encode($rowsData);
       // echo json_encode("php customer");
    }
}
if($customerAction=="Save"){
    if ($connection){
        if ($connection->query("INSERT INTO Customer VALUES ('$id','$name','$address',$salary)")){
            echo "true";
            die;
        }
    }
    echo "false";
}
if($customerAction=="Update"){
    if ($connection){
        if ($connection->query("Update Customer SET name='$name',Salary=$salary,Address='$address' WHERE id= '$id' ")){
            echo "true";
            die;
        }
    }
    echo "false";
}

if($customerAction=="Delete"){
    if ($connection){
        if ($connection->query("Delete From customer Where id='$id'")){
            echo "true";
            die;
        }
    }
    echo "false";
}

