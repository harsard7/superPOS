function loadAllItems() {

    var ajaxConfig={
        method:"POST",
        url:"manage-item.php",
        async:true,
        data:$("#frmItem").serialize(),
         dataType:"json"
    }





    $.ajax(ajaxConfig).done(function(response) {

        $("#tblItem tbody").html("");

        for(var index in response){
            var row=response[index];
            var html="<tr>" +
                "<td id='code'>"+row[0]+"</td>" +
                "<td id='description'>"+row[1]+"</td>" +
                "<td id='qty'>"+row[3]+"</td>" +
                "<td id='price'>"+row[2]+"</td>" +
                "</tr>";
            $("#tblItem").append(html);
        }
    });

}
loadAllItems();

$("#btnSave").click(function () {
    $("#txtAction").val("save");
      var ajaxConfig={
          method:"POST",
          url:"manage-item.php",
          async:true,
          data:$("#frmItem").serialize(),
          dataType:"JSON"
      }
      $.ajax(ajaxConfig).done(function (response) {

          alert(response);
          if(response==true) {
              alert("save success");
              $("#txtAction").val(null);
              loadAllItems();
              cleatFields()
          }else{
              alert("save Failed");

          }

      });
});
$("#tblItem").on('click', 'tr', function(){
//$("#tblItem").click(function () {
    $("#txtcode").val($(this).find("#code").html());
    $("#txtdescription").val($(this).find("#description").html());
    $("#txtqty").val($(this).find("#qty").html());
    $("#txtprice").val($(this).find("#price").html());

});


$("#btnUpdate").click(function () {
    $("#txtAction").val("update");

    var ajaxConfiq={
        method:"POST",
        url:"manage-item.php",
        async:true,
        data:$("#frmItem").serialize(),
        dataType:"JSON"

    }

    $.ajax(ajaxConfiq).done(function (response) {
        if(response==true){

            alert("Update Success");
            $("#txtAction").val(null);
            loadAllItems();
            cleatFields()
        }else{
            alert("Update fail");

        }




    });

});

$("#btnDelete").click(function () {
    $("#txtAction").val("delete");

    var ajaxConfiq={
        method:"POST",
        url:"manage-item.php",
        async:true,
        data:$("#frmItem").serialize(),
        dataType:"JSON"
    }

    $.ajax(ajaxConfiq).done(function (response) {
        if(response==true){
            alert("delete Success");
            $("#txtAction").val(null);
            loadAllItems();
            cleatFields()

        }else{
            alert("delete Success");
        }

    });

});

function  cleatFields() {
    $("#txtcode").val("");
    $("#txtdescription").val("");
    $("#txtqty").val("");
    $("#txtprice").val("");

};
