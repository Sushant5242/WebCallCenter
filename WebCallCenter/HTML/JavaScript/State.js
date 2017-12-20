var Flag = 'insert';
var State_Id;
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
        bindDataTable();
    }

    function bindDataTable() {
        $.ajax({
            url: '../Handler/State.ashx?eventid=1000',
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

    function SuccessDataTable(JsonResult) {
        $('#tblState').empty();
        var JsonData = jQuery.parseJSON(JsonResult);
        if (JsonData.Table[0] != undefined) {

            var Table = $("<table id='IdStatetbl' class='table   table-hover table-bordered' width='100%' cellspacing='0'><tbody></tbody></table>");
            $("#IdStatetbl tbody").empty();
            var thead = $("<thead><tr><th style='text-align:center;'>Edit</th><th style='text-align:center;'>Delete</th><th>ID</th><th>State Name</th><th>Country Name</th><th>CountryId</th></tr></thead>")
            lnkEdit = "<a onclick=\"Editclick(this)\" ><span class=\"glyphicon glyphicon-edit\"></span></a>";
            lnkDelete = "<a onclick=\"Deleteclick(this)\" ><span class=\"glyphicon glyphicon-trash\"></span></a>";
           
            thead.appendTo(Table);

            Table.appendTo('#tblState');

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
                $tr.appendTo('#IdStatetbl tbody');
            });
        }
        $('#IdStatetbl').dataTable({
            "columnDefs": [
            {
                "sClass": "hide_me",
                "aTargets": [2,5]
            }, { "orderable": false, "targets": [0,1] }
            ],  "order": [[3, "desc"]],
            searching: true,
            paging: true,
            ordering: true,
            info: true
        });
    }


    window.Editclick = function Editclick(lnk) {
        debugger;
        var row = lnk.closest('tr');
        State_Id = $(row).find("td:nth-child(3)").text();
        var State_Name = $(row).find("td:nth-child(4)").text();
        $('#txtState').val(State_Name); 
        $("select#ddlCountry").val($(row).find("td:nth-child(6)").text());
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
        var State_Id = $(row).find("td:nth-child(3)").text();
       
        $.ajax({
            url: '../Handler/State.ashx?eventid=1000',
            type: 'POST',
            cache: false,
            async: false,
            data: { "State_Id": State_Id, "Flag": 'delete' },
            success: SuccessOnDelete,
            error: ErrorData
        });
    }

    function clearControl() {
        $("#txtState").val('');
        var Flag = 'insert';
        onPageload();

    }

    $("#Id_Clear").click(function () {
        clearControl();
    });

    $("#Id_Submit").click(function () {
        debugger;
        if ($('#txtState').val() == '') {
            alert("Enter State");
            return;
        }
        if ($('#ddlCountry').prop('selectedIndex') == 0) {
            alert("Select Country");
            return;
        }
        else {
            $.ajax({
                url: '../Handler/State.ashx?eventid=1000',
                type: 'POST',
                cache: false,
                async: false,
                data: { "State": $("#txtState").val(),"State_Id":State_Id, "Country_Id": $('#ddlCountry').prop('selectedIndex'), "Flag": Flag },
                success: SuccessSave,
                error: ErrorData
            });
        }
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