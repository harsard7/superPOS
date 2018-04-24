<?php
include "connection.php";

//form Data
// Unescape the string values in the JSON array
    $get = explode('&', $_POST['form']); // explode with and

    foreach ($get as $key => $value) {
        $formData[substr($value, 0, strpos($value, '='))] = substr($value, strpos($value, '=') + 1);
    }
// access your query param name=ddd&email=aaaaa&username=wwwww&password=wwww&password=eeee
//    var_dump($need['cname']);
//    echo $need['qtyonhand'];

$cid = $formData["customerid"];
$cname = $formData["cname"];
$code = $formData["itemcode"];
$description = $formData["description"];
$qtyonhand = $formData["qtyonhand"];
$unitprice = $formData["unitprice"];
$qty = $formData["qty"];
$oid = $formData["oid"];
$orderDate = $formData["orderDate"];

//table data
$tableData = stripcslashes($_POST['pTableData']);

//var_dump($tableData);
echo "<br>";

// Decode the JSON array
$tableData = json_decode($tableData, TRUE);
//var_dump($tableData);
//echo $tableData[0];
echo "<br>";




    if($connection){

            $connection->begin_transaction();
            //$connection->autocommit(false);
            //inser to order table
            if ($connection->query("insert into orders values('$oid','$orderDate','$cid')")) {
                //table data
                $tableData = stripcslashes($_POST['pTableData']);
                // Decode the JSON array
                $tableData = json_decode($tableData, TRUE);
                $arraySize = sizeof($tableData);

                for ($x = 0; $x < $arraySize; $x++) {

                    $Code = $tableData[$x]['Code'];
                    $Description = $tableData[$x]['Description'];
                    $UnitPrice = $tableData[$x]['Unit Price'];
                    $Qty = $tableData[$x]['Qty'];
                    $Code = $tableData[$x]['Code'];
                    $totalprice = $tableData[$x]['total price'];

                    //insert to orderdetail
                    if ($connection->query("insert into orderdetail values('$oid','$Code',$Qty,$UnitPrice)")) {
                        // $result =$connection->query("select name from customer where id='$cid'")->fetch_all();

                        $qtyonhand = $connection->query("select qtyOnHand from item where code='$Code'");

                        if ($qtyonhand->num_rows > 0) {
                            // output data of each row
                            while ($row = $qtyonhand->fetch_assoc()) {
                                $qoh = $row['qtyOnHand'] - $Qty;
                                if ($connection->query("update item set qtyonhand =$qoh where code='$Code'")) {
                                    // $connection->commit();
                                    // echo "true";
                                } else {
                                    echo "Error :Item data";
                                    $connection->rollback();
                                    return false;
                                }
                                 $connection->commit();
                                echo "true";
                            }
                        }
                    } else {
                        echo "Error :Order Detail data";
                        $connection->rollback();
                        return false;
                    }
                }
            } else {
                echo "Error :Order data";
                $connection->rollback();
                return false;
            }
            echo "Saved to Database";
            $connection->commit();


    }else{
        echo "connection Error";
    }


    $connection->close();


