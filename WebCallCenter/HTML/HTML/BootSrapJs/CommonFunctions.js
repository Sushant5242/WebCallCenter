// Common Function To Process DataTable & Return ColumnName
// Pass The JSON DataTable Object & Column Index To Find Column Name
// Function To Get Column Name From JSON Object By Passing Column Index
// Pass Table Object Or Pass Single Object From Array
function GetColumnName(table, colIndex) {
    var i = 0;
    var ColumnName;

    try {

        $.each(table, function(key, value) {

            i++;

            if (i == colIndex)
                ColumnName = key;
        });

        return ColumnName;
    } catch (err) {

        alert('Error :: ' + err);
        return false;
    }

}

// Function To Call Event For Field
// This Function Is Useful When We Want To Trigger Any Event At Client Side
function CallEventForField(FieldId, EventName) {
    var Field = $(FieldId).attr('id').split('_')[2];

    if (EventName == "onblur") {
        EventName = "blur";
    } else if (EventName == "onclick") {
        EventName = "click";
    } else if (EventName == "onchange") {
        onchange = "change";
    } else if (EventName == "onkeyup") {
        EventName = "keyup";
    }

    $('#ctl00_' + Field).val($(FieldId).val());
    $('#ctl00_' + Field).trigger(EventName);
}

// Function To Validate Date On Each Date Control Field
// Pass Only Date Control Value To Be Validated
function ValidateDate(dateValue) {

    try {

        var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
        var IsValid = dtRegex.test(dateValue);

        if (IsValid) {

            return true;
        } else {

            alert("Enter Date In DD-MM-YYYY Format");
            return false;
        }
    } catch (err) {

        alert('Error :: ' + err);
        return false;
    }
}

// Function To Check 'Checkbox' Control Present Inside Each Row At First Position.
// When Checkbox In Table Heading Is 'Checked' Then All Rows Within Table Must Be Selected.
function SelectAllRows(tableName, currentObject) {
    try {

        var ColumnIndex = $(currentObject).parent().index();
        ColumnIndex += 1;

        if ($(currentObject).is(':checked')) {

            // We are calling dataTable() method here to get all the rows fron table, 
            // If dataTable() method is not called then only rows shown on UI will be affected.
            $('#' + tableName).dataTable().$('tr').find('td:nth-child(' + ColumnIndex + ')').find('input').prop('checked', 'checked');
        } else {

            $('#' + tableName).dataTable().$('tr').find('td:nth-child(' + ColumnIndex + ')').find('input').prop('checked', false);
        }
    } catch (err) {

        alert('Error :: ' + err);
        return false;
    }
}

// Function To Show Links On Column Click,
// tableName -- Table On Which "Div" Should Be Displayed.
// row -- Row From Where Event Is Generated.
// e -- Event Source In This Case The Cell Object.
function ShowLinkOnColumnClick1(tableName, row, e) {
    try {

        $('#' + tableName + '_CCE_Dialog').dialog({
            title: 'Select',
            position: [e.clientX, e.clientY],
            width: '200px',
            height: 'auto',
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });

        $('#' + tableName + '_CCE_Dialog').attr('cols', $(row).closest('tr').attr('actualrowid'));
    } catch (err) {

        alert('Error :: ' + err);
    }

}

function ShowLinkOnColumnClick(tableName, cell, e) {
    try {

        $('#' + tableName + '_CCE_Dialog').dialog({
            title: 'Select',
            //position : [e.clientX, e.clientY],
            //  position: { my: "left top", at: "left bottom", of: button }, 
            width: 'auto',
            height: 'auto',
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });

        console.log($(cell).closest('tr'));
    } catch (err) {

        alert('Error :: ' + err);
    }

}
//to get the row cell value
window.setValue = function setValue(cell) {
    treeid = $(cell).closest('tr').find('td:nth-child(4)').text().trim();

}

// Function To Block UI When AJAX Call starts
function BlockUI() {
    try {

        $.blockUI({
            css: {
                border: '8px solid white',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '15px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });

    } catch (err) {

        alert('Error :: ' + err);
    }
}

// Function To UnBlock UI
function UnBlockUI() {
    try {

        $.unblockUI();
    } catch (err) {

        alert('Error :: ' + err);
    }
}

// Function To Create ToolBar Links On Grid
// tableName -- Pass The TableId On Which You Want To Show ToolBar Link
// htmlToolbarLinks -- Represent HTML Code For Links Passed as a hardcode value
function CreateToolBarLinks(tableName, htmlToolbarLinks) {
    try {

        var ToolbarLinks = "<div style='margin-top:5px;margin-bottom:10px;margin-left:10px;'>" + htmlToolbarLinks + "</div>";
        $(tableName).parent().parent().parent().prepend(ToolbarLinks);
    } catch (err) {

        alert('Error :: ' + err);
    }
}

// Function to change  the row color when cursor hover the table
// row -- Represents row on which you want to show effect
// flag -- Represent mousein & mouseout event if 'i' then mousein else 'o' then mouseout
function ChangeRowColor(row, flag) {
    // Flag For Mouse In Event
    if (flag == 'i') {

        $(row).css('background-color', '#DADADA');
        $(row).addClass('.selected');
    } else {

        $(row).css('background-color', '#FFFFFF');
        $(row).removeClass('.selected');
    }
}


// Function To Map Values From AutoComplete div to Fields
// selectedRow -- Represents row from which RowClick event is fired
// fieldId -- Represent field on which AutoComplete div is created
function RowClicked(selectedRow, fieldId, valueMappings) {

    valueMappings = valueMappings.split('|');

    if (valueMappings.length > 0) {
        for (var i = 0; i < valueMappings.length - 1; i++) {
            var ValueMap = valueMappings[i].split('~');

            var ValueInColumn = $(selectedRow).find("td:nth-child(" + ValueMap[0] + ")").text();

            $('#ctl00_' + ValueMap[1]).val(ValueInColumn);
        }
    } else {

    }

    CloseAutoCompleteDiv(fieldId);
    $('#ctl00_' + fieldId).focus();
}

// Function To Close AutoComplete Help (Close After Row Clicked)
// fieldId -- Field from which AutoComplete div is created.
function CloseAutoCompleteDiv(fieldId) {
    var DivName = "ctl00_" + fieldId + "_AutoComplete";

    $('#' + DivName).remove();
}

// Function To Create & Show AutoComplete Div
// jsonTableData -- Represents data to be displayed in AutoComplete table.
// fieldId -- Represents field on which Automcomplete div is created.
// valueMappings -- Represents mapping of values in rows to fields.
function ShowAutoCompleteDiv(jsonTableData, fieldId, valueMappings, e) {
    // Remove Existing <div> if any
    var DivName = "ctl00_" + fieldId + "_AutoComplete";

    // Create HTML Table Structure From JSONData       
    if (jsonTableData.Table.length > 0) {

        $('#' + DivName).remove();

        var HTML = "<div id='ctl00_" + fieldId + "_AutoComplete' class='helpDiv'>";
        HTML += "<img onclick=\"CloseAutoCompleteDiv('" + fieldId + "')\" src=\"./assets/img/Deep_Close.png\" class=\"pull-right close-AutoComplete\" />";
        HTML += "<table class=\"table-condensed table-bordered custom-table\">";

        $.each(jsonTableData, function(table, rows) {

            var TableName = table;

            if (Object.keys(rows[0]).length > 0) {

                HTML += "<thead><tr>";

                for (var ColumnIndex in Object.keys(rows[0])) {

                    HTML += "<th>" + Object.keys(rows[0])[ColumnIndex] + "</th>";
                }

                HTML += "</tr></thead>";
                HTML += "<tbody>";

                var iRowCounter = 0;

                $.each(rows, function(row, values) {

                    HTML += "<tr rowid=\"" + (++iRowCounter) + "\" id=\"AutoComplete_" + (++iRowCounter) + "\" onclick=\"RowClicked(this, '" + fieldId + "', '" + valueMappings + "');\" >";

                    $.each(values, function(key, value) {

                        HTML += "<td>" + value + "</td>";
                    });

                    HTML += "</tr>";
                });

                HTML += "</tbody></table></div>";
            }
        });

        $("#ctl00_" + fieldId).after($(HTML));

        var controlPosition = $("#ctl00_" + fieldId).offset();

        $("#ctl00_" + fieldId + "_AutoComplete").offset({
            top: controlPosition["top"] + 30,
            left: controlPosition["left"]
        });
    } else {

        $('#' + DivName).remove();
    }
}

// Function To Remove Unneccessary Columns From Grid If Columns Are Not Mapped
// helpDiv -- Represents "div" (modal dialog) in which grid is shown.
// gridId -- Represents grid from which we want to remove unmapped columns so that dataTable() method should not generate error
// mappedColumns -- Represents mapping of columns on grid, we have to remove unmapped columns.
// Such situation occurs when stored procedure returns more column than mapped to the grid.
function RemoveUnMappedColumns(helpDivName, gridId, mappedColumns) {
    mappedColumns = parseInt(mappedColumns.split('�').length) - 2;

    $("#" + helpDivName + " table tr").find('td:gt(1)').remove();
}

// Function To Align File Control
function AlignFileControl() {
    $('.customfile-feedback').parent().parent().css('margin-left', '0px');
    $('.customfile-feedback').parent().parent().find('span').css('height', '30px');
}

// Function To AutoClose Datepicker Control
function AutoCloseDatePicker() {
    $('.date').css('margin-right', '20px');

    $('.dp').on('change', function() {
        $('.datepicker').prop('format', 'DD-MM-YYYY');
        $('.datepicker').hide();
    });
}

// Function To Map Values From 'HelpGrid' To Fields On Row Click
// columnFieldMappings -- Represents key-value pair of value and it's mapping field
function MapValuesToControl(columnFieldMappings, currentRow, fieldId) {
    // multiple field mappings are stored with Pipe symbol
    columnFieldMappings = columnFieldMappings.trim().split('|').slice(0, -1);

    for (var i = 0; i < columnFieldMappings.length; i++) {
        // Field and it's values are kept in pair usng Tilda symbol
        var fieldMapping = columnFieldMappings[i].split('~');

        var valueInColumn = $(currentRow).find('td:nth-child(' + fieldMapping[0] + ')').text().trim();

        $('#ctl00_' + fieldMapping[1]).val(valueInColumn);
    }

    // After mapping values we need to remove dialog from UI.
    $('.ui-dialog').children().empty();
    $('.ui-dialog').children().remove();
    $('.ui-dialog').remove();
    $('#ctl00_' + fieldId).focus();
}

// Function To Show Div With Links On Column Click
// columnIndex -- Represents column except gridlinks. By clicking on this index div will be made visible
function ShowDivOnColumnClick(columnIndex) {
    $('#ColumnClickDiv').show();
    $('#ColumnClickDiv div').hide();
    $('#ColumnClickDiv #Div_Column_' + columnIndex + '_Click').show();
}

// Function To Get Query String Value
// name -- Represents name of the QueryString parameter
function getQueryStringValueByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Function For Mapping QueryString Values To Fields
// queryStringMapping -- Represents mappingField - value pair separated by Pipe symbol
function MapQueryStringValues(queryStringMapping) {
    //debugger;
    queryStringMapping = queryStringMapping.split('|').slice(0, -1);

    for (var index in queryStringMapping) {
        var queryString = queryStringMapping[index].split('~');

        $('#ctl00_' + queryString[1]).val(getQueryStringValueByName(queryString[0]));
    }
}

// Function For Email Validation
// sEmail -- Email that should be validated
function ValidateEmail(sEmail) {

    try {

        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

        if (filter.test(sEmail)) {

            return true;
        } else {

            return false;
        }
    } catch (err) {

        console.log('Error Validating Email :: ' + err);
    }
}

// Function To Generate Global Unique Identifier
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// function to show effects when tab is clicked currently we are showing tab name in the title after click
// memberName -- Represents name that we want to show on Title Bar of page.
// flag -- Represents whether member is Registered or Not.
function TabClicked(memberName, flag) {

    $('#tabs').click('tabsselect', function(event, ui) {

        var selectedTab = $("#tabs").tabs('option', 'active');

        $('#title h4').text($($('#tabs li')[selectedTab]).children('a').text().trim() + ' - ' + memberName);

        if (flag == 'Y')
            $('#title h4').html($('#title h4').html() + "<img style='width:30px;height:30px;float:right;' id='ron' src='assets/img/green_blink.gif' />");
        else if (flag == 'N')
            $('#title h4').html($('#title h4').html() + "<img style='width:30px;height:30px;float:right;' id='ron' src='assets/img/red_blink.gif' />");
        else
            $('#title h4').html($('#title h4').html() + "<img style='width:30px;height:30px;float:right;' id='ron' src='assets/img/orange.gif' />");

    });
}

// Function To Fill Combo With Values In JSON Table Object
// fieldId -- Represents ID of the ComboBox
// jsonTable -- Represents data to be filled in fieldId
function FillCombo(fieldId, jsonTable) {
    //debugger;
    $('#ctl00_' + fieldId + ' option').remove();

    $.each(jsonTable, function(option, value) {

        var newOption = $('<option>').val(value["Column1"]).text(value["Column2"]);
        $('#ctl00_' + fieldId).append(newOption);
    });

    $('#ctl00_' + fieldId).prepend("<option value=''> -- Select -- </option>").val('');
}

function FillComboSimple(field, jsonTable) {

    $('#' + field + ' option').remove();
    var combo_Table_data = jsonTable;

    $.each(combo_Table_data, function(option, value) {

        var newOption = $('<option>').val(value[GetColumnName(value, 1)]).text(value[GetColumnName(value, 2)]);
        $('#' + field).append(newOption);
    });

    $('#' + field).prepend("<option value=''> -- Select -- </option>").val('');
}





// Function To Create New Row In Table (Enable Insert Mode)
// tableName -- Represents name of the table in which row will be created
// We use this function only with the grids having "Enable Insert Mode" tag "on".
function CreateNewRowInTable(tableName) {

    var newRow = $('#' + tableName + ' tbody tr:last').clone();

    newRow = newRow.attr('actualrowid', parseInt(newRow.attr('actualrowid')) + 1);
    // Specific To Preferences Div
    newRow.find('td:nth-child(2) input').attr('value', '')

    $('#' + tableName + ' tbody').append(newRow);
}

// Function To Remove Row From Table
// tableName -- Represents name of the table from which row will be removed.
// RowId -- Represents row which will be removed from tableName
function RemoveRowFromTable(tableName, RowId) {

    $('#' + tableName + ' tbody tr').attr('actualrowid', RowId).remove();
}

// Function To Validate Required Field Values
function ValidateRequiredFields() {

    try {

        $.each($('.required'), function(key, value) {


        });
    } catch (err) {

        alert('Error In Validating Required Fields');
        return false;
    }
}

// Function To Create Dynamic Div
// prefix -- Represents prefix value to be used so that newly created div will be distinguished.
// identity -- Represents identity value used to identify newly created div uniquely.
// attachTo -- Represents element to which the newly created div will be appended.
// name -- Represent title to be displayed on newly created div.
function CreateDynamicDiv(prefix, identity, attachTo, name) {

    var $compartment = $("<div>", {
        class: "form-group"
    });
    $compartment.css('width', '100%');
    $compartment.css('margin-top', '3px');
    var $div = $("<div>", {
        id: prefix + identity,
        class: "panel panel-default"
    });
    $div.append("<div class='panel-heading'><h4 class='panel-title'><b>" + name + "</b></h4></div>");
    $div.append("<div class='panel-body'></div>");

    $div.appendTo($compartment);
    $compartment.appendTo(attachTo);
}


// Function To Show Only Appointments
function ShowOnlyAppointments() {

    $('#Frame1').contents().find('#ui-id-1').hide();
    $('#Frame1').contents().find('#Detail1').hide();
    $('#Frame1').contents().find('#ui-id-2').hide();
    $('#Frame1').contents().find('#Detail2').hide();
    $('#Frame1').contents().find('#ui-id-3').hide();
    $('#Frame1').contents().find('#Detail3').hide();
    $('#Frame1').contents().find('#ui-id-5').hide();
    $('#Frame1').contents().find('#Detail5').hide();
    $('#Frame1').contents().find('#ui-id-6').hide();
    $('#Frame1').contents().find('#Detail6').hide();
    $('#Frame1').contents().find('#ui-id-7').hide();
    $('#Frame1').contents().find('#Detail7').hide();
}

// Function To Set Required Fields
function SetRequiredFields() {

    $('.requiredField').css('border-color', 'red');
}

// Function To Go Back By One Step Using history Object
function GoBack() {

    $('.btn-danger').click(function() {
        history.go(-1);
    });
}

// Function To Remove Associated Symptoms From Table
// m -- Represents MainSymptomId 
// s -- Represents SubTypeId, if not passed only row with main symptom id will be removed
function RemoveAssociatedSymptom(m, s) {

    if (s == undefined) {

        $("#Detail7_Panel21_Table tbody tr[ms=" + m + "]").remove();
    } else {

        $("#Detail7_Panel21_Table tbody tr[ms=" + m + "][st=" + s + "]").remove();
    }

    if ($("#Detail7_Panel21_Table tbody tr").length == 0) {

        $("#Detail7_Panel21_Table").remove();
    } else {

    }
}

// Function To Remove Signs
// m -- Represents main symptom id.
// s -- Represents sub type id.
// a -- Represents associated symptom id.
function RemoveSigns(m, s, a) {

    try {

        if (s == undefined && a == undefined) {

            $("#Detail7_Panel22_Table tbody tr[ms='" + m + "']").remove();
        } else if (a == undefined) {

            $("#Detail7_Panel22_Table tbody tr[ms='" + m + "'][st='" + s + "']").remove();
        } else {

            $("#Detail7_Panel22_Table tbody tr[ms='" + m + "'][st='" + s + "'][as='" + a + "']").remove();
        }


        if ($("#Detail7_Panel22_Table tbody tr").length == 0) {

            $("#Detail7_Panel22_Table").remove();
        } else {

        }
    } catch (err) {

        alert("Error While Removing Symptom");
    }
}

// Function To Hide Component / Element From DOM
// component -- Represents element which will be hide from DOM
function HideComponent(component) {

    $(component).hide();
}

// function -- Notification Factory
// alertId -- Represents unique ID for each alert
// style -- Represents priority of alert (Low-Green, Medium-Yello, High-Red)
// callId -- Represents callId aginst which alert is created
// phoneNo -- Contact number for which alert is raised
function CreateNotification(alertId, style, callId, phoneNo) {

    try {
        var HTML = "<div style='border:1px solid white;'><div id='container' class='clearfix'><div class='title' data-notify-html='title' style='color:black;'/>";
        HTML += "<input data-style='" + style + "' id='ctl00_" + alertId + "_" + style + "' type='text' style='display:none;' value='" + alertId + "' />";
        HTML += "<a id='link_" + alertId + "' onclick='javascript:destroy(this);SetFlag(\"" + alertId + "\");' style='float:right;'><span class='glyphicon glyphicon-remove' style='color:black;margin-top:7px;margin-right:3px;border: 1px solid black;'></span></a>";

        if (callId == 0) {


        } else {
            // Create show link inside notification
            HTML += "<a id=\"callLink_" + callId + "\" onclick=\"javascript:window.parent.CloseDialog();ShowCallDetails('" + phoneNo + "', '" + callId + "');\" style=\"float:right;margin-top:8px;margin-right:3px;cursor:pointer;color:black;\" title=\"Call Details\"><kbd style=\"border:1px solid white;\">Show</kbd></a>";
        }


        HTML += "</div></div></div>";



        $.notify.addStyle('foo', {

            html: HTML
        });
    } catch (err) {

        //console.log('Error ==> Exception In CreateNotification :: ' + err);
    }
}

// function to show notification on the screen through iframe
// message -- Represents ,essage to be displayed in the notification div.
// alertId -- Represents Id of alert so that when clicked on close button alert will get updated
// style -- Represents priority and colors to notification div will be applied based on this value
function ShowNotification(message, alertId, style) {

    try {
        $.notify({

            title: message
        }, {
            style: 'foo',
            autoHide: false,
            clickToHide: false
        });

        var style = parseInt($('#ctl00_' + alertId + '_' + style).attr('data-style'));

        switch (style) {

            case 1:
                $('#ctl00_' + alertId + '_' + style).parent().parent().css('background', 'rgb(0, 200, 64)');
                break;

            case 2:
                $('#ctl00_' + alertId + '_' + style).parent().parent().css('background', 'rgb(197, 218, 100)');
                break;

            case 3:
                $('#ctl00_' + alertId + '_' + style).parent().parent().css('background', 'rgb(255, 62, 76)');
                break;
        }
    } catch (err) {

        //console.log('Error ==> Exception In ShowNotification :: ' + err);
    }
}

// funciton to remove notification from the screen when user clicks on alert
// element -- Represents element te be removed from DOM
function destroy(element) {

    $(element).parent().parent().parent().parent().remove();
    //$(element).trigger('notify-hide');
}

// function to open document in another tab or window uploaded from the tab
// element -- Represents link in the table
// filePath -- Path of the document to be opened
function OpenDocument(element, filePath) {

    var member_id = $(element).closest('tr').find('td:nth-child(2)').text().trim();

    filePath = filePath.replace(/�/g, '/');

    window.open("../../../IHC_Tab/IHC_Images/" + member_id + "/" + filePath, '');
}

// function to animate the control pass the <control id>, <effect>, [parameters], <duration>, [callback function]
// control -- Represents an element on whichwe want to show animation
// effect -- Represents an animation effect that we want to show on control
// options -- Represents configuration object using which animation is controlled.
// duration -- Represents time interval for an animation
function AnimateControl(control, effect, options, duration, callbackFunction) {

    $(control).effect(effect, options, duration, callbackFunction);
}

// function to open IHC information documents uploaded on the server.
// filePath -- Represents path to the document to be opened.
function OpenDocumentType(filePath) {

    filePath = "../../CustomerData/Documents/" + filePath;
    window.open(filePath);

}

// Function to set backgroung color when row is selected
// row -- Represents row in table
function RowSelected(row) {

    $('tr').removeAttr('style');
    $('tr').removeAttr('selected');
    $(row).css('background-color', 'khaki');
    $(row).attr('selected', 'true');

    window.SelectedRow = $(row).find('td:first').text().trim();
    window.Row = $(row);
}


// function to convert a JSON object to CSV format
// strJSON -- Represents stringified version of JSON object / table
function GetCSV(strJSON) {

    var rows = typeof strJSON != 'object' ? JSON.parse(strJSON) : strJSON;
    var csv = '';

    for (var i = 0; i < rows.length; i++) {

        var line = '';

        for (var index in rows[i]) {

            if (line != '') line += ','

            line += rows[i][index];
        }

        csv += line + '\r\n';
    }

    return csv;
}
//Function For Bind Dropdown
function Fillddl(fieldId, jsonTable) {

    $('#' + fieldId + ' option').remove();
    var combo_Table_data = jsonTable;

    $.each(combo_Table_data, function(option, value) {

        var newOption = $('<option>').val(value[GetColumnName(value, 1)]).text(value[GetColumnName(value, 2)]);
        $('#' + fieldId).append(newOption);
    });

    $('#' + fieldId).prepend("<option value='0'> -- Select -- </option>").val('0');
}

// Function to make an AJAX call
// Parameter Details 1) sUrl --> Handler path to which you want to make call
//                   2) sMethod --> HTTP method you want to use for the AJAX call
//                   3) sData --> Data you want to send to server
//                   4) sSuccessFunction --> Function you want to execute after server returns a success response
//                   4) sErrorFunction --> Function you want to execute after server returns a error response
function MakeRequest(sUrl, sMethod, sData, sSuccessFunction, sErrorFunction) {
   // debugger;
   // CheckSession();
    $.ajax({
        url: sUrl,
        type: sMethod,
        data: sData,
        success: sSuccessFunction,
        error: sErrorFunction
    });
}

function HideColumns(tableElement, columnsToHide) {

    for (var i = 0; i < columnsToHide.length; i++) {

        $(tableElement).find('thead tr').find("th:nth-child('" + columnsToHide[i] + "')").hide();
        $(tableElement).find('tbody tr').find("td:nth-child('" + columnsToHide[i] + "')").hide();
    }
}

function CalculateAge(e) {

    var today = new Date();
    var birthDate = new Date(e.date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function ShowMessage(sMessage, sTitle) {
    
    if(sTitle === undefined || sTitle === null || sTitle == "") {
    
    }
    else {
        $('#MessageModalTitle').text(sTitle);
    }
    
    $('#MessageModalBody div').text(sMessage);
    $('#MessageModal').modal();
}



// Function For Creating Radio buttons // Added By Siddhant 
	function FillRadio(div, jsonTable) {
		var combo_Table_data = jsonTable;

	$.each(combo_Table_data, function(option, value1) {
		$("#"+div).append(
		
			$('<input />', { 
					type: 'radio',  
				    id: 'rb_' + value1[GetColumnName(value1, 2)],
				    name:'rbName',
					value: value1[GetColumnName(value1, 1)]
				} )
		
			).append(
			$('<label />', {
				'text':  value1[GetColumnName(value1, 2)],
				'style': 'margin-left: 2%'
			}
		)
			).append($('<br />'));    
		});
}


function MakeRequestLogin(sUrl, sMethod, sData, sSuccessFunction, sErrorFunction) {
    //debugger;
     //CheckSession();
    $.ajax({
        url: sUrl,
        type: sMethod,
        data: sData,
        success: sSuccessFunction,
        error: sErrorFunction
    });
}


function CheckSession() {
    var url = "../../Handler/CheckSeeion.ashx";
    debugger;
    $.ajax(
       {
           url: url,
           cache: false,
           async: false, // use sync results
           success: function(data) {
               if(data != ''){
               data=JSON.parse(data);
                    if(data[0] == 'N'){
                        alert('Session expired ! Kindly login again !');
                        window.location = data[1];
                    }
               }
           },
          error:function(data){
          
          }
       }
      );
}