function loadCustomerId() {
    $("#txtAction").val("loadCid");
    var ajaxconfiq={
        method:"POST",
        url:"manage-order.php",
        async:true,
        data:$("#frmOrder").serialize(),
        dataType:"json"
    };

    $.ajax(ajaxconfiq).done(function(response) {
        $("#frmOrder P #cid").html("");

        console.log(response);

        for(var index in response){
            var row=response[index];
           //var html="<option id='cid'>" +row[0]+"</option>";
           var html="<option class='op1' selected  custoid=" + row[0] + ">" + row[0] + "</option>";
            $("#cid").append(html);
            $("#inphidden").val(row[0]);
        }
    });
};
loadCustomerId();


//select option
$(function() {
    $("#cid").change(function(){

        $("#txtAction").val("loadcusname");

        var cusids = $('#cid').find(":selected").text();
        $("#inphidden").val(cusids);

        var ajaxconfiq={
            method:"POST",
            url:"manage-order.php",
            async:true,
            data:$("#frmOrder").serialize(),
            dataType:"json"
        }

        $.ajax(ajaxconfiq).done(function (response) {

           console.log(response);
            for(var index in response) {
                var cname = response[index];
               $("#txtName").val(cname);
            }
        })
    });
});

//loaditemcode

function loadItemcode() {

    $("#txtAction").val("loadCode");
    var ajaxconfiq={
        method:"POST",
        url:"manage-order.php",
        async:true,
        data:$("#frmOrder").serialize(),
        dataType:"json"
    }

    $.ajax(ajaxconfiq).done(function(response) {
        $("#frmOrder P #nameCode").html("");

        for(var index in response){
            var row=response[index];
            //var html="<option idh='cid'>" +row[0]+"</option>";
            var html="<option class='op2' selected  code=" + row[0] + ">" + row[0] + "</option>";
            $("#nameCode").append(html);
            $("#inphidden").val(row[0]);
        }
    });

};
loadItemcode();

//select option item description
$(function() {

    $("#nameCode").change(function(){

        $("#txtAction").val("loadDescription");

        var codes = $('#nameCode').find(":selected").text();

        $("#codehidden").val(codes);

        var ajaxconfiq={
            method:"POST",
            url:"manage-order.php",
            async:true,
            data:$("#frmOrder").serialize(),
            dataType:"json"
        }

        $.ajax(ajaxconfiq).done(function (response) {
           // console.log(response);
            for(var index in response) {
                var cname = response[index];
                console.log(cname);
                $("#txtdescription").val(cname[0]);
                $("#txtqtyonhand").val(cname[1]);
                $("#txtunitprice").val(cname[2]);
            }
        })
    });
});

$("#btnSave").click(addToTable);

function addToTable(){

    //$("#tblOrders tbody").html("");
         var code=$("#nameCode").val();
         var descr=$("#txtdescription").val();
         var unitprice=parseFloat($("#txtunitprice").val());
         var qty=parseInt($("#txtqty").val());
         var totalprice=unitprice*qty;
         var hidden="saveorder";
         var newrow="<tr>" +
             "<td>"+code+"</td>" +
             "<td>"+descr+"</td>"+
             "<td>"+unitprice+"</td>"+
             "<td>"+qty+"</td>"+
             "<td>"+totalprice+"</td>"+
             "<td style='display:none' id='divOne'>"+hidden+"</td>"+
             "</tr>";

    $("#tblOrders tbody").append(newrow);
};

//save button
$("#btnSaveOrder").click(function () {

var TableData;

function storeTblValues(){

    var TableData = new Array();

    $('#tblOrders tr').each(function(row, tr){

        TableData[row]={
            "Code" : $(tr).find('td:eq(0)').text()
            , "Description" :$(tr).find('td:eq(1)').text()
            , "Unit Price" : $(tr).find('td:eq(2)').text()
            , "Qty" : $(tr).find('td:eq(3)').text()
            , "total price" : $(tr).find('td:eq(4)').text()
            , "saveorder" : $(tr).find('td:eq(5)').text()
        }
    });
    TableData.shift();  // first row will be empty - so remove
    return TableData;
}

//$("#btnSaveOrder").click(function () {
    TableData = storeTblValues();

   TableData = JSON.stringify(TableData);
    $.ajax({
        method:"POST",
        url: "saveOrder.php",
        async:true,
       // data:"pTableData="+TableData,
        data:{'pTableData':TableData , 'form': $("#frmOrder").serialize()},
        success: function(msg){
            //alert(msg);
        },
        dataType:"json"
    });
});

