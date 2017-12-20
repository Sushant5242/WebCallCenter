var Flag = 'insert';
var Country_Id ;
$(document).ready(function () {

    onPageload();

    function onPageload() {
        $.ajax({
            url: '../Handler/Country.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "Flag":'select' },
            success: SuccessDataTable,
            error: ErrorData
        });
    }

    function SuccessDataTable(JsonResult) {
        $('#tblCountry').empty();
        var JsonData = jQuery.parseJSON(JsonResult);
        if (JsonData.Table[0] != undefined) {

            var Table = $("<table id='IdCountrytbl' class='table   table-hover table-bordered' width='100%' cellspacing='0'><tbody></tbody></table>");
            $("#IdCountrytbl tbody").empty();
            var thead = $("<thead><tr><th style='text-align:center;'>Edit</th><th style='text-align:center;'>Delete</th><th>ID</th><th>Country Name</th></tr></thead>")
            lnkEdit = "<a onclick=\"Editclick(this)\" ><span class=\"glyphicon glyphicon-edit\"></span></a>";
            lnkDelete = "<a onclick=\"Deleteclick(this)\" ><span class=\"glyphicon glyphicon-trash\"></span></a>";
            thead.appendTo(Table);

            Table.appendTo('#tblCountry');

            $.each(JsonData.Table, function (key, value) {
                // Map Values From Column To Control On Row Click
               // $tr = $("<tr>");
               // $tr += $('<td><a class="table-edit" data-id="' + value.Country_Id + '">EDIT</a></td>');
               // $td = $('<td style=\"width:10px"/>');
                $tr = $("<tr actualRowId='" + (key + 1) + "' id='Row_" + (key + 1) + "' />");
                $td = $("<td style='text-align:center;'>" + lnkEdit + "</td>");
                $td.appendTo($tr);

                $td = $("<td style='text-align:center;'>" + lnkDelete + "</td>");
                $td.appendTo($tr);

                $.each(value, function (k, v) {
                    $td = $('<td class=\"table-edit"/ style=\"width:10px"/>Edit</td>');
                    if (v != null) {
                        $td = $('<td>');
                        $td.text(v);
                        $td.appendTo($tr);
                    }
                });
                $tr.appendTo('#IdCountrytbl tbody');
            });
        }
        $('#IdCountrytbl').dataTable({ 
            "columnDefs": [
            {
                "sClass": "hide_me",
                "aTargets": [ 2 ] 
            },{ "orderable": false, "targets": [0,1] }
            ], "order": [[3, "desc"]],
            searching: true,
            paging: true,
            ordering: true,
            info: true
        });
        debugger;
    }

   
    window.Editclick = function Editclick(lnk) {
        debugger;
        var row = lnk.closest('tr');
        Country_Id = $(row).find("td:nth-child(3)").text();
        var Country_Name = $(row).find("td:nth-child(4)").text();
        $('#txtCountry').val(Country_Name);
        Flag = "update";
         
        $('#TabIndex1').addClass('active');
        $('#TabIndex2').removeClass('active');
        $("#aattr1").attr("aria-expanded", "true");
        $("#aattr2").attr("aria-expanded", "false");

        $('#tab_2-2').removeClass('tab-pane active');
        $('#tab_2-2').addClass('tab-pane');

        $('#tab_1-1').removeClass('tab-pane');
        $('#tab_1-1').addClass('tab-pane active');
      
    }

    window.Deleteclick = function Deleteclick(lnk) {
        debugger;
        var row = lnk.closest('tr');
        var Country_Id = $(row).find("td:nth-child(3)").text();
        
        $.ajax({
            url: '../Handler/Country.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "Country_Id":Country_Id,"Flag": 'delete' },
            success: SuccessOnDelete,
            error: ErrorData
        });
    }

    function clearControl() {
        $("#txtCountry").val('');
        var Flag = 'insert';
        onPageload();
    }

    $("#Id_Clear").click(function () {
        clearControl();
    });

    $("#Id_Submit").click(function () {
        debugger;
        if($('#txtCountry').val()=='')
        {
            alert("Enter Country");
            return;
        }
        else
        {  
            $.ajax({
                url: '../Handler/Country.ashx?eventid=1000',
                type: 'POST',
                cache: false,
                async: false,
                data: { "Country": $("#txtCountry").val(),"Country_Id":Country_Id,"Flag":Flag },
                success: SuccessSave,
                error: ErrorData
            });
        }
    });

    function SuccessSave(JsonData) {
        debugger;
        var chartData = jQuery.parseJSON(JsonData);
        if(chartData.Table[0].Column1 != '')
        {
            alert(chartData.Table[0].Column2);
            clearControl();
        }
    }

    function SuccessOnDelete(JsonData) {
        debugger;
        var chartData = jQuery.parseJSON(JsonData);
        if (chartData.Table[0].Column1 != '') {
            alert(chartData.Table[0].Column2);
            onPageload(); 
        }
    }

    function ErrorData(JsonData) {
    }

    

});