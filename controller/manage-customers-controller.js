function loadAllCustomers(){

    var ajaxConfig = {
        method: "POST",
        url: "manage-customers.php",
        async: true,
        data: $("#frmCustomer").serialize(),
        dataType: "json"
    }

    $.ajax(ajaxConfig).done(function(response){
      console.log(response);

        $("#tblCustomers tbody").html("");

        for(var index in response){
            var row = response[index];
            var html = "<tr>" +
                "<td id='id'>" + row[0]  + "</td>" +
                "<td id='name'>" + row[1] + "</td>" +
                "<td id='address'>" + row[2] + "</td>" +
                "<td id='salary'> " + row[3] + "</td>" +
                "</tr>"
            $("#tblCustomers tbody").append(html);
        }
    });
}

loadAllCustomers();

$("#btnSave").click(function(){

    $("#txtAction").val("Save");

    var ajaxConfig = {
        method : "POST",
        url: "manage-customers.php",
        async: true,
        data: $("#frmCustomer").serialize(),
        dataType: "json"
    }

    $.ajax(ajaxConfig).done(function(response){

        if (response == true){

            alert("Customer has been successfully added");
            $("#txtAction").val(null);
            loadAllCustomers();
            clearInput();

        }else{

            alert("Failed to save the customer");
        }
    });
});

$("#tblCustomers").on('click', 'tr', function(){
   // $("#tblCustomers").click(function(){

    $("#txtID").val($(this).find("#id").html());
    $("#txtName").val($(this).find("#name").html());
    $("#txtAddress").val($(this).find("#address").html());
    $("#txtSalary").val($(this).find("#salary").html());
});

$("#btnUpdate").click(function () {

    $("#txtAction").val("Update");

    var ajaxConfig = {
        method : "POST",
        url: "manage-customers.php",
        async: true,
        data: $("#frmCustomer").serialize(),
        dataType: "json"
    }

    $.ajax(ajaxConfig).done(function(response){

        if (response == true){

            alert("Customer has been successfully Updated");
            $("#txtAction").val(null);
            loadAllCustomers();
            clearInput();

        }else{

            alert("Failed to Update the Customer");
        }
    });
});

$("#btnDelete").click(function () {

    $("#txtAction").val("Delete");

    var ajaxConfig = {
        method : "POST",
        url: "manage-customers.php",
        async: true,
        data: $("#frmCustomer").serialize(),
        dataType: "json"
    }

    $.ajax(ajaxConfig).done(function(response){

        if (response == true){

            alert("Customer has been successfully Deleted");
            $("#txtAction").val(null);
            loadAllCustomers();
            clearInput();

        }else{

            alert("Failed to Delete the Customer");
        }
    });
});

function clearInput() {
    $("#txtID").val("");
    $("#txtName").val("");
    $("#txtAddress").val("");
    $("#txtSalary").val("");
}




