<?php
include "connection.php";
$action=$_POST["Action"];
$code=$_POST["code"];
$description=$_POST["description"];
$qty=$_POST["qty"];
$price=$_POST["price"];



if($action==null){
    if($connection){
        $rowdata=$connection->query("select * from item")->fetch_all();
        echo json_encode($rowdata);


    }
}

if($action=="save"){
    if($connection){
        if($connection->query("insert into item VALUES ('$code','$description',$price,$qty)")){
            echo "true";
            die;
        }
       // echo "false";
    }
   // echo "false";
}

if($action=="delete"){
    if($connection){
        if($connection->query("delete from item where code='$code'")){
            echo "true";
        }
       // echo "false";
    }
   // echo "false";
}
if($action=="update"){
    if($connection){
        if($connection->query("update item set description='$description',unitprice='$price',qtyonhand='$qty' where code='$code'")){
            echo "true";
        }
        //echo "false";
    }
   // echo "false";
}


