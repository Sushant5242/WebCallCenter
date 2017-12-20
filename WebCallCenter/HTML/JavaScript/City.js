var Flag = 'insert';
var City_Id;
$(document).ready(function () {
   
    onPageload();

    function onPageload() { 
        $.ajax({
            url: '../Handler/Country.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "Flag": 'select' },
            success: SuccessCountrySelect,
            error: ErrorData
        });
    }

    function SuccessCountrySelect(JsonData) { 
        JsonResult = jQuery.parseJSON(JsonData);
        Fillddl('ddlCountry', JsonResult.Table);
        bindState(); 
    }

    function bindState() { 
        $.ajax({
            url: '../Handler/State.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "Flag": 'select' },
            success: SuccessStateSelect,
            error: ErrorData
        });
    }

    function SuccessStateSelect(JsonData) {
        JsonResult = jQuery.parseJSON(JsonData);
        FillddlState('ddlState', JsonResult.Table);
        bindDataTable();
    } 

    function bindDataTable() {
        $.ajax({
            url: '../Handler/City.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "Flag": 'select' },
            success: SuccessDataTable,
            error: ErrorData
        });
    }

    function Fillddl(fieldId, jsonTable) {
        $('#' + fieldId + ' option').remove();
        var combo_Table_data = jsonTable;
        $('#' + fieldId).append("<option value='All'>Select</option>");
        $.each(combo_Table_data, function (option, value) {
            var newOption = $('<option>').val(value[GetColumnName(value, 1)]).text(value[GetColumnName(value, 2)]);
            $('#' + fieldId).append(newOption);
        });

    }

    function FillddlState(fieldId, jsonTable) {
        debugger;
        $('#' + fieldId + ' option').remove();
        var combo_Table_data = jsonTable;
        $('#' + fieldId).append("<option value='All'>Select</option>");
        $.each(combo_Table_data, function (option, value) {
            var newOption = $('<option>').val(value[GetColumnName(value, 1)]).text(value[GetColumnName(value, 2)]);
            $('#' + fieldId).append(newOption);
        }); 
    }

    function SuccessDataTable(JsonResult) {
        $('#tblCity').empty();
        var JsonData = jQuery.parseJSON(JsonResult);
        if (JsonData.Table[0] != undefined) {

            var Table = $("<table id='IdCitytbl' class='table   table-hover table-bordered' width='100%' cellspacing='0'><tbody></tbody></table>");
            $("#IdCitybl tbody").empty();
            var thead = $("<thead><tr><th style='text-align:center;'>Edit</th><th style='text-align:center;'>Delete</th><th>ID</th><th>City Name</th><th>State ID</th><th>State Name</th><th>Country ID</th><th>Country Name</th></tr></thead>")
            lnkEdit = "<a onclick=\"Editclick(this)\" ><span class=\"glyphicon glyphicon-edit\"></span></a>";
            lnkDelete = "<a onclick=\"Deleteclick(this)\" ><span class=\"glyphicon glyphicon-trash\"></span></a>";

            thead.appendTo(Table);

            Table.appendTo('#tblCity');

            $.each(JsonData.Table, function (key, value) {
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
                $tr.appendTo('#IdCitytbl tbody');
            });
        }
        $('#IdCitytbl').dataTable({
            "columnDefs": [
            {
                "sClass": "hide_me",
                "aTargets": [2,4,6]
            }, { "orderable": false, "targets": [0, 1] }
            ], "order": [[3, "desc"]],
            searching: true,
            paging: true,
            ordering: true,
            info: true
        });
    }


    window.Editclick = function Editclick(lnk) {
        debugger;
        var row = lnk.closest('tr');
        var City_Id = $(row).find("td:nth-child(3)").text();
        var City_Name = $(row).find("td:nth-child(4)").text();
        $('#txtCity').val(City_Name);
        $("select#ddlState").val($(row).find("td:nth-child(5)").text());
        $("select#ddlCountry").val($(row).find("td:nth-child(7)").text());
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
        var City_Id = $(row).find("td:nth-child(3)").text();

        $.ajax({
            url: '../Handler/City.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "City_Id": City_Id, "Flag": 'delete' },
            success: SuccessOnDelete,
            error: ErrorData
        });
    }

    function clearControl() {
        $("#txtCity").val('');
        var Flag = 'insert';
        onPageload();

    }

    $("#Id_Clear").click(function () {
        clearControl();
    });

    $("#Id_Submit").click(function () {
        debugger;
        if ($('#txtCity').val() == '') {
            alert("Enter City");
            return;
        }
        if ($('#ddlCountry').prop('selectedIndex') == 0) {
            alert("Select Country");
            return;
        }
        if ($('#ddlState').prop('selectedIndex') == 0) {
            alert("Select State");
            return;
        }
        else {
            $.ajax({
                url: '../Handler/City.ashx?eventid=1000',
                type: 'POST',
                cache: false,
                async: false,
                data: { "City": $("#txtCity").val(), "State_Id": $('#ddlState').prop('selectedIndex'), "Country_Id": $('#ddlCountry').prop('selectedIndex'), "Flag": Flag },
                success: SuccessSave,
                error: ErrorData
            });
        }
    });

    $("#ddlCountry").change(function () {
        var Country_Id = $('#ddlCountry').prop('selectedIndex');

        $.ajax({
            url: '../Handler/City.ashx?eventid=1001',
            type: 'POST',
            cache: false,
            async: false,
            data: { "Country_Id": Country_Id },
            success: SuccessStateSelect,
            error: ErrorData
        });

    });

    function SuccessSave(JsonData) {
        debugger;
        var chartData = jQuery.parseJSON(JsonData);
        if (chartData.Table[0].Column1 != '') {
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