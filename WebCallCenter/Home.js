var Data = {};
$(document).ready(function () {

    MakeRequest("HTML5/handler/Home.ashx?EventId=1", 'POST', Data, SuccessUserNameData, ErrorData);
    $('#Heading').hide();

    $('#Id_User').on("click", function (event) {
        $('#Heading').hide();
        $('#drawer-toggle-label').trigger('click');
    });

    $('#Id_Division').on("click", function (event) {
        $('#Heading').hide();
        $('#drawer-toggle-label').trigger('click');
    });

    $('#Id_Channel').on("click", function (event) {
        $('#Heading').hide();
        $('#drawer-toggle-label').trigger('click');
    });
    $('#Id_ReportForChannel').on("click", function (event) {
        $('#Heading').hide();
        $('#drawer-toggle-label').trigger('click');
    });

    $('#Id_ReportForDivision').on("click", function (event) {
        $('#Heading').hide();
        $('#drawer-toggle-label').trigger('click');
    });
    $('#Id_ReportForManagement').on("click", function (event) {
        $('#Heading').hide();
        $('#drawer-toggle-label').trigger('click');
    });
    function SuccessUserNameData(JsonChartData) {
        debugger;
        var UserData = jQuery.parseJSON(JsonChartData);

        if (UserData.Table[0] != undefined) {
            //document.getElementById('lblUserName').innerHTML = UserData.Table[0].User_ID;
            //document.getElementById('lblUser').innerHTML = UserData.Table[0].Name;
            $('#lblUserName').val(UserData.Table[0]["User_ID"]);
            $('#lblUser').val(UserData.Table[0]["Name"]);
        }
        var UserName = UserData.Table[0].Name;
        $('div#TitleDiv').find(".LoggedInUser").attr("title", UserName);
        MakeRequest("HTML5/handler/Home.ashx?EventId=2", 'POST', Data, SuccessUserRole, ErrorData);
    }

    function ErrorData(JsonData) {
    }

    function SuccessUserRole(JsonResponse) {
        JsonResponse = jQuery.parseJSON(JsonResponse);

        if (JsonResponse != null || JsonResponse != undefined) {
            if (JsonResponse.Table.length >= 1) {
                var Role = (JsonResponse.Table[0].Role);
                if (Role == 'Channel Manager') {
                    $('#Id_ReportForChannel').show();
                    $('#Id_ReportForDivision').hide();
                    $('#Id_ReportForManagement').hide();
                }
                else if (Role == 'Division Head') {
                    $('#Id_ReportForChannel').hide();
                    $('#Id_ReportForDivision').show();
                    $('#Id_ReportForManagement').hide();
                }
                else if (Role == 'Management') {
                    $('#Id_ReportForChannel').hide();
                    $('#Id_ReportForDivision').hide();
                    $('#Id_ReportForManagement').show();
                }
                else {
                    $('#Id_ReportForChannel').show();
                    $('#Id_ReportForDivision').show();
                    $('#Id_ReportForManagement').show();
                }
            }
        }
        MakeRequest("HTML5/handler/Home.ashx?EventId=3", 'POST', {}, SuccessUserName, ErrorData);
    }


    function SuccessUserName(JsonResponse) {
        JsonResponse = jQuery.parseJSON(JsonResponse);
        debugger;
        if (JsonResponse != null || JsonResponse != undefined) {
            if (JsonResponse.Table.length >= 1) {
                var Role = (JsonResponse.Table[0].Role);
                var User_ID = (JsonResponse.Table[0].User_ID);
                var Name = (JsonResponse.Table[0].Name);
                var lblUserName = Role + ' : ' + User_ID + ' - ' + Name;
                $('#lblUserM').text(lblUserName);
            }
        }
    }

});