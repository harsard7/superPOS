<?php

/**
 * Created by IntelliJ IDEA.
 * User: Chanuka Sandaruwan
 * Date: 3/2/2018
 * Time: 7:43 PM
 */

include "connection.php";
$Action=$_POST["cAction"];
$cid = $_POST["customerid"];
$cname = $_POST["cname"];
$code = $_POST["itemcode"];
$description = $_POST["description"];
$qtyonhand = $_POST["qtyonhand"];
$unitprice = $_POST["unitprice"];
$qty = $_POST["qty"];




if($_POST["cAction"]=="loadCid" || $_POST["cAction"]=="loadCode"){
    // $Action=$_POST["cAction"];

    if($Action=="loadCid") {
        if ($connection) {

            $rowsData = $connection->query("SELECT * FROM Customer")->fetch_all();
            echo json_encode($rowsData);
        }
    }

    if($Action=="loadCode") {
        if ($connection) {
            $rowsData = $connection->query("SELECT * FROM item")->fetch_all();
            echo json_encode($rowsData);
        }
    }
}

if($Action=="loadcusname"){
    if($connection){
        $result =$connection->query("select name from customer where id='$cid'")->fetch_all();
        echo json_encode($result);
    }
}

if($Action=="loadDescription"){
    if($connection){
        $result =$connection->query("select description ,qtyOnHand,unitPrice from item where code='$code'")->fetch_all();
        echo json_encode($result);
    }
}






