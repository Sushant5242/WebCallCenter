var Data = {};
var DataFilter = {};
var Limit = 31;


$(document).ready(function () {
    debugger;
    MakeRequest('../Handler/DashBoard.ashx?eventid=1000', 'POST', Data, SuccessUserNameData, ErrorData)
   
    onPageload();
    $('#Heading').hide(); 

    $("#btnOk").click(function () { 
        Data = {
            "ProductionDivision": $("#ct100_ProductionDivision").val(),
            "Section": $("#ct100_Section").val(),
            "Criticality": $("#ct100_Criticality").val(),
            "PlantDept": $("#ct100_PlantDept").val(),
            "TradeDept": $("#ct100_TradeDept").val(),
            "CostCenter": $("#ct100_CostCenter").val(),
            "Group": $("#ct100_Group").val(),
            "SubGroup": $("#ct100_SubGroup").val(),
            "JobType": $("#ct100_JobType").val(),
            "Year": $("#ct100_Year").val(),
            "Month": $("#ct100_Month").val(),
        }

        //Data for passing parameters as it wants short forms of filters

        DataFilter = {
            "Div": $("#ct100_ProductionDivision").val(),
            "Sec": $("#ct100_Section").val(),
            "Cr": $("#ct100_Criticality").val(),
            "PD": $("#ct100_PlantDept").val(),
            "TD": $("#ct100_TradeDept").val(),
            "CC": $("#ct100_CostCenter").val(),
            "Group": $("#ct100_Group").val(),
            "SubGroup": $("#ct100_SubGroup").val(),
            "JobType": $("#ct100_JobType").val(),
        }

        $('#Heading').show();

        if (Data.Year == "0") {
            document.getElementById('Year').innerHTML = 'All';
        }
        else {
            document.getElementById('Year').innerHTML = Data.Year;
        }
        if (Data.Month == "1") {
            document.getElementById('Month').innerHTML = 'January';
        }
        else if (Data.Month == "2") {
            document.getElementById('Month').innerHTML = 'February ';
        }
        else if (Data.Month == "3") {
            document.getElementById('Month').innerHTML = 'March';
        }
        else if (Data.Month == "4") {
            document.getElementById('Month').innerHTML = 'April';
        }
        else if (Data.Month == "5") {
            document.getElementById('Month').innerHTML = 'May';
        }
        else if (Data.Month == "6") {
            document.getElementById('Month').innerHTML = 'June';
        }
        else if (Data.Month == "7") {
            document.getElementById('Month').innerHTML = 'July';
        }
        else if (Data.Month == "8") {
            document.getElementById('Month').innerHTML = 'August';
        }
        else if (Data.Month == "9") {
            document.getElementById('Month').innerHTML = 'September';
        }
        else if (Data.Month == "10") {
            document.getElementById('Month').innerHTML = 'October';
        }
        else if (Data.Month == "11") {
            document.getElementById('Month').innerHTML = 'November';
        }
        else if (Data.Month == "12") {
            document.getElementById('Month').innerHTML = 'December';
        }
        else {
            document.getElementById('Month').innerHTML = 'All';
        }
       
        $.ajax({
            url: 'Handlers/DashBoard.ashx?eventid=1003',
            type: 'POST',
            cache: false,
            async: false,
            data: Data,
            success: SuccessCompVsPendingChartData,
            error: ErrorData
        });

        //MakeRequestSync('Handlers/DashBoard.ashx?eventid=1003', 'POST', Data, SuccessCompVsPendingChartData, ErrorData)

        $.ajax({
            url: 'Handlers/DashBoard.ashx?eventid=1004',
            type: 'POST',
            cache: false,
            async: false,
            data: Data,
            success: SuccessJobDistributionChartData,
            error: ErrorData
        });

       // MakeRequestSync('Handlers/DashBoard.ashx?eventid=1004', 'POST', Data, SuccessJobDistributionChartData, ErrorData)

        $.ajax({
             url: 'Handlers/DashBoard.ashx?eventid=1005',
             type: 'POST',
             cache: false,
             async: false,
             data: Data,
             success: SuccessWorkQualificationChartDataTable,
             error: ErrorData
        });

       // MakeRequestSync('Handlers/DashBoard.ashx?eventid=1005', 'POST', Data, SuccessWorkQualificationChartData, ErrorData)
       // MakeRequestSync('Handlers/DashBoard.ashx?eventid=1005', 'POST', Data, SuccessWorkQualificationChartDataTable, ErrorData)

        $.ajax({
            url: 'Handlers/DashBoard.ashx?eventid=1006',
            type: 'POST',
            cache: false,
            async: false,
            data: Data,
            success: SuccessBreakdownRepetitivenessChartData,
            error: ErrorData
        });

      //  MakeRequestSync('Handlers/DashBoard.ashx?eventid=1006', 'POST', Data, SuccessBreakdownRepetitivenessChartData, ErrorData)

        $.ajax({
            url: 'Handlers/DashBoard.ashx?eventid=1007',
            type: 'POST',
            cache: false,
            async: false,
            data: Data,
            success: SuccessBreakdownTrendsChartData,
            error: ErrorData
        });

      //  MakeRequestSync('Handlers/DashBoard.ashx?eventid=1007', 'POST', Data, SuccessBreakdownTrendsChartData, ErrorData)

        $.ajax({
            url: 'Handlers/DashBoard.ashx?eventid=1009',
            type: 'POST',
            cache: false,
            async: false,
            data: Data,
            success: SuccessFaultTreeAnalysisChartData,
            error: ErrorData
        });

      //  MakeRequestSync('Handlers/DashBoard.ashx?eventid=1009', 'POST', Data, SuccessFaultTreeAnalysisChartData, ErrorData)


        $.ajax({
            url: 'Handlers/DashBoard.ashx?eventid=1010',
            type: 'POST',
            cache: false,
            async: false,
            data: Data,
            success: SuccessDowntimeAnalysisChartData,
            error: ErrorData
        });

       // MakeRequestSync('Handlers/DashBoard.ashx?eventid=1010', 'POST', Data, SuccessDowntimeAnalysisChartData, ErrorData)

        $('.sidebar-toggle').trigger('click');

    });

    function idbrowser() {
        var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }
    
    function SuccessUserNameData(JsonResult)
    {
        debugger;
        $('#WorkQuantification').empty();
        var JsonData=jQuery.parseJSON(JsonResult);
        if(JsonData.Table[0]!=undefined){
        
         var Table = $("<table id='WorkQuantificationtbl' class='table   table-hover table-bordered' width='100%' cellspacing='0'><tbody></tbody></table>");
         
         var thead=$("<thead><tr><th colspan='7'>Work Quantification</th></tr><tr><th>Month-Year</th><th>Total Request</th><th>Working Days</th><th>Per Day</th><th>MTBR(Hrs)</th><th>Closed Orders</th><th>Closure</th></tr></thead>")
         
         thead.appendTo(Table);
         
         Table.appendTo('#WorkQuantification');
         
         $.each(JsonData.Table, function(key, value) {
            // Map Values From Column To Control On Row Click
            $tr = $("<tr>");
           
            $.each(value, function(k, v) {

                if (v != null) {
                    // $td = $('<td style=\"width:10px"/>');
                    $td = $('<td />');
                    $td.text(v);
                    $td.appendTo($tr);
                }
            });
            $tr.appendTo('#WorkQuantificationtbl tbody');
        });
        }
        $('#WorkQuantificationtbl').dataTable({ searching: false, paging: false, ordering: false, info:false });
    }

    $("#Download1").on('click', function () { 
        myBarCanvas.options.title.text = "New DataPoint Added at the end";
        myBarCanvas.render();
        var canvas = $("#Div0  canvas").get(0);
        $('#PendJob').removeClass('col-md-4');
        $('#PendJob').addClass('col-md-8');
        savePendingVsCompletedJob("#Div0 canvas", "main");
    });

    function savePendingVsCompletedJob(placeholderID, targetID) {
        //alert(idbrowser());
        var canvas = document.getElementById('canvas');
        setTimeout(function () {
            var evt; 
           // if ((navigator.appName == "Microsoft Internet Explorer") || (navigator.appName == "Netscape") || ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf('Edge')) > -1)) {
            if((idbrowser().indexOf("IE")>-1)||(idbrowser().indexOf("Edge")>-1)){ 
            if (canvas.msToBlob) { //for IE
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'PendingVsClosedJob.png');
                }
            }
            else
                {
                    var dataURL = canvas.toDataURL();
                    var evt = new MouseEvent('click', {
                        view: window,
                        bubbles: false,
                        cancelable: true
                    });
                    var Newimg = canvas.toDataURL("image/png");
                    var PendingVsCompletedJobsImg = document.createElement('a');
                    PendingVsCompletedJobsImg.setAttribute('download', 'PendingVsClosedJob.jpg');
                    PendingVsCompletedJobsImg.setAttribute('href', Newimg);
                    PendingVsCompletedJobsImg.dispatchEvent(evt); 
            }
          }, 1000);


    }

    $("#Download2").on('click', function () {
        var canvas1 = $("#Div1 canvas1").get(0);
        $('#JobDist').removeClass('col-md-4');
        $('#JobDist').addClass('col-md-8');
        saveJobDistribution("#Div1 canvas1", "main");

    });

    function saveJobDistribution(placeholderID, targetID) {
        var canvas = document.getElementById('canvas1');
        setTimeout(function () {
            var evt;
           // if ((navigator.appName == "Microsoft Internet Explorer") || (navigator.appName == "Netscape") || ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf('Edge')) > -1)) {
            if ((idbrowser().indexOf("IE") > -1) || (idbrowser().indexOf("Edge") > -1)) {
            if (canvas.msToBlob) { //for IE
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'JobDistribution.png');
                }
            }
            else {
                var dataURL = canvas.toDataURL();
                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                var Newimg = canvas.toDataURL("image/png");
                var JobDistributionImg = document.createElement('a');
                JobDistributionImg.setAttribute('download', 'JobDistribution.jpg');
                JobDistributionImg.setAttribute('href', Newimg);
                JobDistributionImg.dispatchEvent(evt);
            } 
        }, 1000);
    }

    $("#Download3").on('click', function () {
        // var canvas2 = $("#Div2 canvas").get(0); 
      //  $('#WorkquantIFic').removeClass('col-md-4');
      //  $('#WorkquantIFic').addClass('col-md-8');
         GenearateWorkQuntificationimage();
    });

    function GenearateWorkQuntificationimage(){            
         fnExcelReport("WorkQuantificationtbl"); 
        } 

    $("#Download4").on('click', function () {
        var canvas3 = $("#Div3 canvas").get(0);
        $('#BkdRept').removeClass('col-md-4');
        $('#BkdRept').addClass('col-md-8');
        saveBreakdownRepetitiveness("#Div3 canvas3", "main");
    });

    function saveBreakdownRepetitiveness(placeholderID, targetID) {
        var canvas = document.getElementById('canvas3');
        setTimeout(function () {
            var evt;
           // if ((navigator.appName == "Microsoft Internet Explorer") || (navigator.appName == "Netscape") || ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf('Edge')) > -1)) {
            if ((idbrowser().indexOf("IE") > -1) || (idbrowser().indexOf("Edge") > -1)) {
            if (canvas.msToBlob) { //for IE
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'BreakdownRepetitiveness.png');
                }
            }
            else {
                var dataURL = canvas.toDataURL();
                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                var Newimg = canvas.toDataURL("image/png");
                var BreakdownRepetitivenessImg = document.createElement('a');
                BreakdownRepetitivenessImg.setAttribute('download', 'BreakdownRepetitiveness.jpg');
                BreakdownRepetitivenessImg.setAttribute('href', Newimg);
                BreakdownRepetitivenessImg.dispatchEvent(evt);
            }
        }, 1000);
    }

    $("#Download5").on('click', function () {
        var canvas4 = $("#Div4 canvas").get(0);
        $('#BkdTrends').removeClass('col-md-4');
        $('#BkdTrends').addClass('col-md-8');
        saveBreakdownTrends("#Div4 canvas4", "main");
    });

    function saveBreakdownTrends(placeholderID, targetID) {
        var canvas = document.getElementById('canvas4');
        setTimeout(function () {

            var evt;
           // if ((navigator.appName == "Microsoft Internet Explorer") || (navigator.appName == "Netscape") || ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf('Edge')) > -1)) {
            if ((idbrowser().indexOf("IE") > -1) || (idbrowser().indexOf("Edge") > -1)) {
            if (canvas.msToBlob) { //for IE
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'BreakdownTrends.png');
                }
            }
            else {
                var dataURL = canvas.toDataURL();
                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                    var Newimg = canvas.toDataURL("image/png");
            var BreakdownTrendsImg = document.createElement('a');
            BreakdownTrendsImg.setAttribute('download', 'BreakdownTrends.jpg');
            BreakdownTrendsImg.setAttribute('href', Newimg);
            BreakdownTrendsImg.dispatchEvent(evt);
            }  
        }, 1000);
    }

    $("#Download7").on('click', function () {
        var canvas6 = $("#Div6 canvas").get(0);
        $('#FaultTreeAnylysis').removeClass('col-md-4');
        $('#FaultTreeAnylysis').addClass('col-md-8');
        saveFaultTreeAnalysis("#Div6 canvas6", "main");
    });

    function saveFaultTreeAnalysis(placeholderID, targetID) {
        var canvas = document.getElementById('canvas6');
        setTimeout(function () { 
            var evt;
          //  if ((navigator.appName == "Microsoft Internet Explorer") || (navigator.appName == "Netscape") || ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf('Edge')) > -1)) {
            if ((idbrowser().indexOf("IE") > -1) || (idbrowser().indexOf("Edge") > -1)) {
            if (canvas.msToBlob) { //for IE
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'FaultTreeAnalysis.png');
                }
            }
            else {
                var dataURL = canvas.toDataURL();
                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                var Newimg = canvas.toDataURL("image/png");
                var FaultTreeAnalysisImg = document.createElement('a');
                FaultTreeAnalysisImg.setAttribute('download', 'FaultTreeAnalysis.jpg');
                FaultTreeAnalysisImg.setAttribute('href', Newimg);
                FaultTreeAnalysisImg.dispatchEvent(evt);
            }  
        }, 1000);
    }

    $("#Download8").on('click', function () {
        var canvas7 = $("#Div7 canvas").get(0);
        $('#DownTymAnalysis').removeClass('col-md-4');
        $('#DownTymAnalysis').addClass('col-md-8');
        saveDowntimeAnalysis("#Div7 canvas7", "main");
    });

    function saveDowntimeAnalysis(placeholderID, targetID) {
        var canvas = document.getElementById('canvas7');
        setTimeout(function () {

            var evt;
          //  if ((navigator.appName == "Microsoft Internet Explorer") || (navigator.appName == "Netscape") || ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf('Edge')) > -1)) {
            if ((idbrowser().indexOf("IE") > -1) || (idbrowser().indexOf("Edge") > -1)) {
            if (canvas.msToBlob) { //for IE
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'DowntimeAnalysis.png');
                }
            }
            else {
                var dataURL = canvas.toDataURL();
                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });
                var Newimg = canvas.toDataURL("image/png");
                var DowntimeAnalysisImg = document.createElement('a');
                DowntimeAnalysisImg.setAttribute('download', 'DowntimeAnalysis.jpg');
                DowntimeAnalysisImg.setAttribute('href', Newimg);
                DowntimeAnalysisImg.dispatchEvent(evt);
            }  
        }, 1000);
    }

    $('#Span0').on('click', function () { 
        $('#PendJob').removeClass('col-md-4');
        $('#PendJob').addClass('col-md-8');

    });

    $('#Span').on('click', function () {
        $('#PendJob').removeClass('col-md-8');
        $('#PendJob').addClass('col-md-4');
    });

    $('#Span1').on('click', function () {
        $('#JobDist').removeClass('col-md-4');
        $('#JobDist').addClass('col-md-8');
    });

    $('#Span2').on('click', function () {
        $('#JobDist').removeClass('col-md-8');
        $('#JobDist').addClass('col-md-4');
    });

    $('#Span14').on('click', function () {
        $('#WorkquantIFic').removeClass('col-md-8');
        $('#WorkquantIFic').addClass('col-md-12');
    });

    $('#Span15').on('click', function () {
        $('#WorkquantIFic').removeClass('col-md-12');
        $('#WorkquantIFic').addClass('col-md-8');
    });

    $('#Span5').on('click', function () {
        $('#BkdRept').removeClass('col-md-4');
        $('#BkdRept').addClass('col-md-8');
    });

    $('#Span6').on('click', function () {
        $('#BkdRept').removeClass('col-md-8');
        $('#BkdRept').addClass('col-md-4');
    });

    $('#Span7').on('click', function () {
        $('#BkdTrends').removeClass('col-md-4');
        $('#BkdTrends').addClass('col-md-8');
    });

    $('#Span8').on('click', function () {
        $('#BkdTrends').removeClass('col-md-8');
        $('#BkdTrends').addClass('col-md-4');
    });

    $('#Span9').on('click', function () {
        $('#FaultTreeAnylysis').removeClass('col-md-4');
        $('#FaultTreeAnylysis').addClass('col-md-8');
    });

    $('#Span10').on('click', function () {
        $('#FaultTreeAnylysis').removeClass('col-md-8');
        $('#FaultTreeAnylysis').addClass('col-md-4');
    });

    $('#Span11').on('click', function () {
        $('#DownTymAnalysis').removeClass('col-md-4');
        $('#DownTymAnalysis').addClass('col-md-8');
    });

    $('#Span12').on('click', function () {
        $('#DownTymAnalysis').removeClass('col-md-8');
        $('#DownTymAnalysis').addClass('col-md-4');
    });

    $("#btnOk").trigger("click"); 
});

function ClearFunction()
{ 
    $('#ct100_ProductionDivision').get(0).selectedIndex = 0;
    $('#ct100_Section').get(0).selectedIndex = 0;
    $('#ct100_Criticality').get(0).selectedIndex = 0;
    $('#ct100_PlantDept').get(0).selectedIndex = 0;
    $('#ct100_TradeDept').get(0).selectedIndex = 0; 
    $('#ct100_JobType').get(0).selectedIndex = 0;
    $('#ct100_Year').get(0).selectedIndex = 0;
    $('#ct100_Month').get(0).selectedIndex = 0;
    $("#btnOk").trigger("click");
}

function onPageload() {
    $('#ct100_Month').get(0).selectedIndex = 0;
    $.ajax({
        url: 'Handlers/DashBoard.ashx?eventid=1001',
        type: 'POST',
        cache: false,
        async: false,
        data: {},
        success: SuccessData,
        error: ErrorData
    });
   // MakeRequestSync('Handlers/DashBoard.ashx?eventid=1001', 'POST', {}, SuccessData, ErrorData)
}
 
function getSection() { 
    var ProductionDivision = $("#ct100_ProductionDivision").val();
    $.ajax({
        url: 'Handlers/DashBoard.ashx?eventid=1011',
        type: 'POST',
        cache: false,
        async: false,
        data: { 'ProductionDivision': ProductionDivision },
        success: SuccessFillSection,
        error: ErrorData
    }); 
}
 
function SuccessFillSection(JsonData)
{
    JsonResult = jQuery.parseJSON(JsonData);
    Fillddl('ct100_Section', JsonResult.Table);
}
 
function getTradeDept() {
   // var PlantDept = $("#ct100_PlantDept").val();
    var PlantDept = $('#ct100_PlantDept').val().substr(1);
    $.ajax({
        url: 'Handlers/DashBoard.ashx?eventid=1013',
        type: 'POST',
        cache: false,
        async: false,
        data: { 'PlantDept': PlantDept },
        success: SuccessFillTradeDept,
        error: ErrorData
    });
}

function SuccessFillTradeDept(JsonData) {
    JsonResult = jQuery.parseJSON(JsonData);
    Fillddl('ct100_TradeDept', JsonResult.Table);
}

function Fillddl(fieldId, jsonTable) { 
    $('#' + fieldId + ' option').remove();
    var combo_Table_data = jsonTable;
    $('#' + fieldId).append("<option value='All'>select</option>");
    $.each(combo_Table_data, function (option, value) {
        var newOption = $('<option>').val(value[GetColumnName(value, 1)]).text(value[GetColumnName(value, 1)]);
        $('#' + fieldId).append(newOption);
    });

}

function Fillddlyear(fieldId, jsonTable) {
    $('#' + fieldId + ' option').remove();
    var combo_Table_data = jsonTable;
    $('#' + fieldId).append("<option value='0'>select</option>");
    $.each(combo_Table_data, function (option, value) {
        var newOption = $('<option>').val(value[GetColumnName(value, 1)]).text(value[GetColumnName(value, 1)]);
        $('#' + fieldId).append(newOption);
    });

    var d = new Date();
    var str = d.getFullYear();
    var select = document.getElementById("ct100_Year");
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == str) {
            select.selectedIndex = i;
            break;
        }
    }
}

function SuccessData(JsonData) { 
    JsonResult = jQuery.parseJSON(JsonData);  
    Fillddl('ct100_ProductionDivision', JsonResult.Table);
    Fillddl('ct100_Section', JsonResult.Table1);
    Fillddl('ct100_PlantDept', JsonResult.Table2);
    Fillddl('ct100_TradeDept', JsonResult.Table3);
    Fillddl('ct100_Criticality', JsonResult.Table4);
    Fillddl('ct100_Group', JsonResult.Table3);
    Fillddl('ct100_SubGroup', JsonResult.Table4);
    Fillddl('ct100_CostCenter', JsonResult.Table1); 

    getjobtype();
}

function getjobtype()
{
    debugger;
    $.ajax({
        url: 'Handlers/DashBoard.ashx?eventid=1002',
        type: 'POST',
        cache: false,
        async: false,
        data: {},
        success: Successgetjobtype,
        error: ErrorData
    });
   // MakeRequestSync('Handlers/DashBoard.ashx?eventid=1002', 'POST', {}, Successgetjobtype, ErrorData)
}

function ErrorData(JsonData) {
}

function Successgetjobtype(JsonData) { 
    JsonResult = jQuery.parseJSON(JsonData);
    Fillddl('ct100_JobType', JsonResult.tbl0);
    Fillddlyear('ct100_Year', JsonResult.tbl2);
    FillMonth('ct100_Month');


}

function FillMonth(fieldId) { 
    var a = "<option value=0>select</option><option value='1'>Jan</option><option value='2'>Feb</option><option value='3'>Mar</option><option value='4'>April</option><option value='5'>May</option><option value='6'>June</option>";
    a = a + "<option value='7'>July</option><option value='8'>Aug</option><option value='9'>Sep</option><option value='10'>Oct</option><option value='11'>Nov</option><option value='12'>Dec</option>";
    $('#ct100_Month').append(a);
}

function GetColumnName(table, colIndex) {
    var i = 0;
    var ColumnName;

    try {

        $.each(table, function (key, value) {

            i++;

            if (i == colIndex)
                ColumnName = key;
        });

        return ColumnName;
    } catch (err) {
         
        return false;
    }

}

function SuccessCompVsPendingChartData(JsonChartData) {
    var chartData = jQuery.parseJSON(JsonChartData);
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var ticks = [];

    $.each(chartData.Table, function (key, value) {
        ticks.push(value["Year"] + ':' + value["MONTH"]);
        s1.push(parseFloat(value["TotalJobCnt"]));
        s2.push(parseFloat(value["CompletedJobCnt"]));
        s3.push(parseFloat(value["PendingJobCnt"]));
    });

    var MaxOfs1 = s1.length;
    var MaxOfs2 = s2.length;
    var MaxOfs3 = s3.length;

    var color = Chart.helpers.color;
    var maxOS1 = Math.max.apply(Math, s1);
    var maxS1 = (Math.ceil(maxOS1 / 10) * 10);
    var maxOS2 = Math.max.apply(Math, s2);
    var maxS2 = (Math.ceil(maxOS2 / 10) * 10);
    var maxOS3 = Math.max.apply(Math, s3);
    var maxS3 = (Math.ceil(maxOS3 / 10) * 10);
    var arr = [maxS1, maxS2, maxS3];
    var maxOfYaxis = Math.max.apply(Math, arr);

    var barChartData = {
        labels: ticks,
        datasets: [{
            label: 'Generated',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: s1
        }, {
            label: 'Closed',
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: s2
        },
         {
             label: 'Pending',
             backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
             borderColor: window.chartColors.orange,
             borderWidth: 1,
             data: s3
         },

        ]

    };

    var canvas = document.getElementById("canvas").getContext("2d");
    if (window.myBarCanvas7 != null) {
        var delCanvas = document.getElementById('Div0');
        delCanvas.innerHTML = '&nbsp;'; $('#Div0').append('<canvas id="canvas" height="150px" width="200px"></canvas>');
        var newContext = $('#canvas').get(0).getContext('2d');
        canvas = document.getElementById("canvas").getContext("2d");
    }
    window.myBarCanvas = new Chart(canvas, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            tooltips: { enabled: false },
            hover: { mode: null },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                ]
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                }
            },
            title: {
                display: true,
                text: 'Generated Jobs Vs Closed Jobs', //+ getsubtitle()
                padding: 12
            },
            animation: {
                onComplete: function () {
                    if (MaxOfs1 < Limit) {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        }
    });
}

function SuccessJobDistributionChartData(JsonChartData) {
    var chartData = jQuery.parseJSON(JsonChartData);
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var s4 = [];
    var ticks = [];

    debugger;

    $.each(chartData.Table, function (key, value) {
        ticks.push(value["StDateYear"] + ':' + value["StDateMonth"]);
        s1.push(parseFloat(value["BreakdownJobCnt"]));
        s2.push(parseFloat(value["PreventiveJobCnt"]));
        s3.push(parseFloat(value["ProactiveJobCnt"]));
        s4.push(parseFloat(value["OtherJobCnt"]));
    });

    var color = Chart.helpers.color;
    var MaxOfs1 = s1.length;
    var MaxOfs2 = s2.length;
    var MaxOfs3 = s3.length;
    var MaxOfs4 = s4.length;

    var maxOS1 = Math.max.apply(Math, s1);
    var maxS1 = (Math.ceil(maxOS1 / 10) * 10);
    var maxOS2 = Math.max.apply(Math, s2);
    var maxS2 = (Math.ceil(maxOS2 / 10) * 10);
    var maxOS3 = Math.max.apply(Math, s3);
    var maxS3 = (Math.ceil(maxOS3 / 10) * 10);
    var maxOS4 = Math.max.apply(Math, s4);
    var maxS4 = (Math.ceil(maxOS4 / 10) * 10);
    var arr = [maxS1, maxS2, maxS3, maxS4];
    var maxOfYaxis = Math.max.apply(Math, arr);

    var barChartData = {
        labels: ticks,
        datasets: [{
            label: "Bkdn's",
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: s1
        }, {
            label: "PM's",
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: s2
        },
         {
             label: 'Proactive',
             backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
             borderColor: window.chartColors.orange,
             borderWidth: 1,
             data: s3
         },
          {
              label: "Oth's",
              backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
              borderColor: window.chartColors.green,
              borderWidth: 1,
              data: s4
          },

        ]

    };

    var canvas1 = document.getElementById("canvas1").getContext("2d");
    if (window.myBarCanvas1 != null) {
        var delCanvas1 = document.getElementById('Div1');
        delCanvas1.innerHTML = '&nbsp;';
        $('#Div1').append('<canvas id="canvas1" height="150px" width="200px"></canvas>');
        var newContext = $('#canvas1').get(0).getContext('2d');
        canvas1 = document.getElementById("canvas1").getContext("2d");
    }
    window.myBarCanvas1 = new Chart(canvas1, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            tooltips: { enabled: false },
            hover: { mode: null },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                ]
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                }
            },
            title: {
                display: true,
                text: 'Job Distribution Review',
                padding: 12
            },
            showTooltips: false,
            animation: {
                onComplete: function () {
                    if (MaxOfs1 < Limit) {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        }
    });
}

function SuccessWorkQualificationChartData(JsonChartData) {
    //    var chartData = jQuery.parseJSON(JsonChartData);
    //    var s1 = [];
    //    var s2 = [];
    //    var s3 = [];
    //    var s4 = [];
    //    var s5 = [];
    //    var s6 = [];
    //    var ticks = [];

    //    $.each(chartData.Table, function (key, value) {
    //        ticks.push(value["StDateYear"] + ':' + value["StDateMonth"]);
    //        s1.push(parseFloat(value["TotalRequest"]));
    //        s2.push(parseFloat(value["WorkingDays"]));
    //        s3.push(parseFloat(value["PerDay"]));
    //        s4.push(parseFloat(value["MTBR"]));
    //        s5.push(parseFloat(value["ClosedOrders"]));
    //        s6.push(parseFloat(value["Closure"]));
    //    });

    //    var color = Chart.helpers.color;
    //    var MaxOfs1 = Math.max.apply(Math, s1);
    //    var MaxOfs2 = Math.max.apply(Math, s2);
    //    var MaxOfs3 = Math.max.apply(Math, s3);
    //    var MaxOfs4 = Math.max.apply(Math, s4);
    //    var MaxOfs5 = Math.max.apply(Math, s5);
    //    var MaxOfs6 = Math.max.apply(Math, s6);

    //    var barChartData = {
    //        labels: ticks,
    //        datasets: [{
    //            label: 'Total Request',
    //            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
    //            borderColor: window.chartColors.red,
    //            borderWidth: 1,
    //            data: s1
    //        }, {
    //            label: 'Working Days',
    //            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
    //            borderColor: window.chartColors.blue,
    //            borderWidth: 1,
    //            data: s2
    //        },
    //         {
    //             label: 'Per Day',
    //             backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
    //             borderColor: window.chartColors.orange,
    //             borderWidth: 1,
    //             data: s3
    //         },
    //          {
    //              label: 'MTBR',
    //              backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
    //              borderColor: window.chartColors.green,
    //              borderWidth: 1,
    //              data: s4
    //          },
    //          {
    //              label: 'Closed Orders',
    //              backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
    //              borderColor: window.chartColors.purple,
    //              borderWidth: 1,
    //              data: s5
    //          },
    //          {
    //              label: 'Closure %',
    //              backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
    //              borderColor: window.chartColors.yellow,
    //              borderWidth: 1,
    //              data: s6
    //          },

    //        ]

    //    };

    //    var canvas2 = document.getElementById("canvas2").getContext("2d");
    //    if (MaxOfs1 < Limit) {
    //        if (window.myBarCanvas2 == null) {
    //            window.myBarCanvas2 = new Chart(canvas2, {
    //                type: 'bar',
    //                data: barChartData,
    //                options: {
    //                    responsive: true,
    //                    legend: {
    //                        position: 'bottom',
    //                        labels: {
    //                            boxWidth: 10,
    //                        }
    //                    },
    //                    title: {
    //                        display: true,
    //                        text: 'Work Quantification',
    //                        padding: 2
    //                    },
    //                    showTooltips: false,
    //                    animation: {
    //                        onComplete: function () {
    //                            var chartInstance = this.chart,
    //                            ctx = chartInstance.ctx;
    //                            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    //                            ctx.textAlign = 'center';
    //                            ctx.textBaseline = 'bottom';

    //                            this.data.datasets.forEach(function (dataset, i) {
    //                                var meta = chartInstance.controller.getDatasetMeta(i);
    //                                meta.data.forEach(function (bar, index) {
    //                                    var data = dataset.data[index];
    //                                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
    //                                });
    //                            });
    //                        }
    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            var delCanvas = document.getElementById('Div2');
    //            delCanvas.innerHTML = '&nbsp;';
    //            $('#Div2').append('<canvas id="canvas2" height="150px" width="200px"></canvas>');
    //            var newContext = $('#canvas2').get(0).getContext('2d');
    //            canvas = document.getElementById("canvas2").getContext("2d");
    //            window.myBarCanvas = new Chart(canvas, {
    //                type: 'bar',
    //                data: barChartData,
    //                options: {
    //                    responsive: true,
    //                    legend: {
    //                        position: 'bottom',
    //                        labels: {
    //                            boxWidth: 10,
    //                        }
    //                    },
    //                    title: {
    //                        display: true,
    //                        text: 'Work Quantification',
    //                        padding: 2
    //                    },
    //                    showTooltips: false,
    //                    animation: {
    //                        onComplete: function () {
    //                            var chartInstance = this.chart,
    //                            ctx = chartInstance.ctx;
    //                            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    //                            ctx.textAlign = 'center';
    //                            ctx.textBaseline = 'bottom';

    //                            this.data.datasets.forEach(function (dataset, i) {
    //                                var meta = chartInstance.controller.getDatasetMeta(i);
    //                                meta.data.forEach(function (bar, index) {
    //                                    var data = dataset.data[index];
    //                                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
    //                                });
    //                            });
    //                        }
    //                    }
    //                }
    //            });
    //        }
    //    }
    //    else
    //    {
    //        if (window.myBarCanvas2 == null) {
    //            window.myBarCanvas2 = new Chart(canvas2, {
    //                type: 'bar',
    //                data: barChartData,
    //                options: {
    //                    responsive: true,
    //                    legend: {
    //                        position: 'bottom',
    //                        labels: {
    //                            boxWidth: 10,
    //                        }
    //                    },
    //                    title: {
    //                        display: true,
    //                        text: 'Work Quantification',
    //                        padding: 2
    //                    }
    //                }
    //            });
    //        }
    //        else {
    //            var delCanvas = document.getElementById('Div2');
    //            delCanvas.innerHTML = '&nbsp;';
    //            $('#Div2').append('<canvas id="canvas2" height="150px" width="200px"></canvas>');
    //            var newContext = $('#canvas2').get(0).getContext('2d');
    //            canvas = document.getElementById("canvas2").getContext("2d");
    //            window.myBarCanvas = new Chart(canvas, {
    //                type: 'bar',
    //                data: barChartData,
    //                options: {
    //                    responsive: true,
    //                    legend: {
    //                        position: 'bottom',
    //                        labels: {
    //                            boxWidth: 10,
    //                        }
    //                    },
    //                    title: {
    //                        display: true,
    //                        text: 'Work Quantification',
    //                        padding: 2
    //                    }
    //                }
    //            });
    //        }
    //    }
}

function SuccessBreakdownRepetitivenessChartData(JsonChartData) {
    var chartData = jQuery.parseJSON(JsonChartData);
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var ticks = [];

    $.each(chartData.Table, function (key, value) {
        ticks.push(value["Year"] + ':' + value["Month"]);
        s1.push(parseFloat(value["BreakdownJobCnt"]));
        s2.push(parseFloat(value["BreakdownmachineCnt"]));
        s3.push(parseFloat(value["MorethanoneBreakdownmachineCnt"]));
    });

    var color = Chart.helpers.color;
    var MaxOfs1 = s1.length;
    var MaxOfs2 = s2.length;
    var MaxOfs3 = s3.length;

    var maxOS1 = Math.max.apply(Math, s1);
    var maxS1 = (Math.ceil(maxOS1 / 10) * 10);
    var maxOS2 = Math.max.apply(Math, s2);
    var maxS2 = (Math.ceil(maxOS2 / 10) * 10);
    var maxOS3 = Math.max.apply(Math, s3);
    var maxS3 = (Math.ceil(maxOS3 / 10) * 10);
    var arr = [maxS1, maxS2, maxS3];
    var maxOfYaxis = Math.max.apply(Math, arr);

    var barChartData = {
        labels: ticks,
        datasets: [{
            label: 'Total Freq',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: s1
        }, {
            label: "# M/c's",
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: s2
        },
         {
             label: "# M/c's > 1",
             backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
             borderColor: window.chartColors.orange,
             borderWidth: 1,
             data: s3
         },

        ]

    };

    var canvas3 = document.getElementById("canvas3").getContext("2d");
    if (window.myBarCanvas1 != null) {
        var delCanvas = document.getElementById('Div3');
        delCanvas.innerHTML = '&nbsp;';
        $('#Div3').append('<canvas id="canvas3" height="150px" width="200px"></canvas>');
        var newContext = $('#canvas3').get(0).getContext('2d');
        canvas3 = document.getElementById("canvas3").getContext("2d");
    }
    window.myBarCanvas3 = new Chart(canvas3, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            tooltips: { enabled: true },
            hover: { mode: null },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                ]
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                }
            },
            title: {
                display: true,
                text: 'Breakdown Repetitiveness',
                padding: 12
            },
            showTooltips: false,
            animation: {
                onComplete: function () {
                    if (MaxOfs1 < Limit) {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        }
    });
}

function SuccessBreakdownTrendsChartData(JsonChartData) {
    var chartData = jQuery.parseJSON(JsonChartData);
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var ticks = [];

    $.each(chartData.Table, function (key, value) {
        if (value["Month"] !== null) {
            ticks.push(value["Year"] + ':' + value["Month"]);
        }
        else {
            ticks.push(value["Year"]);
        }
        s1.push(parseFloat(value["Frequency"]));
        s2.push(parseFloat(value["Downtime"]));
        s3.push(parseFloat(value["SparesCost"]));
    });

    var color = Chart.helpers.color;
    var MaxOfs1 = s1.length;
    var MaxOfs2 = s2.length;
    var MaxOfs3 = s3.length;

    var maxS1 = parseInt(Math.max.apply(Math, s1));
    //var maxS1 = (Math.ceil(maxOS1 / 10) * 10);
    var maxS2 = parseInt(Math.max.apply(Math, s2));
    //  var maxS2 = (Math.ceil(maxOS2 / 10) * 10);
    var maxS3 = parseInt(Math.max.apply(Math, s3));
    //  var maxS3 = (Math.ceil(maxOS3 / 10) * 10);
    var arr = [maxS1, maxS2, maxS3];
    var maxOfYaxis = Math.max.apply(Math, arr);

    var minOS1 = parseInt(Math.min.apply(Math, s1));
    var minS1 = (Math.ceil(minOS1 / 10) * 10);
    var minOS2 = parseInt(Math.min.apply(Math, s2));
    var minS2 = (Math.ceil(minOS2 / 10) * 10);
    var minOS3 = parseInt(Math.min.apply(Math, s3));
    var minS3 = (Math.ceil(minOS3 / 10) * 10);
    var arr1 = [minS1, minS2, minS3];
    var minOfYaxis = Math.min.apply(Math, arr1);

    var barChartData = {
        labels: ticks,
        datasets: [{
            label: 'Frequency',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: s1
        }, {
            label: 'Downtime',
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: s2
        },
         {
             label: 'SparesCost',
             backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
             borderColor: window.chartColors.orange,
             borderWidth: 1,
             data: s3
         },

        ]
    };

    var canvas4 = document.getElementById("canvas4").getContext("2d");
    if (window.myBarCanvas4 != null) {
        var delCanvas = document.getElementById('Div4');
        delCanvas.innerHTML = '&nbsp;';
        $('#Div4').append('<canvas id="canvas4" height="150px" width="200px"></canvas>');
        var newContext = $('#canvas4').get(0).getContext('2d');
        canvas4 = document.getElementById("canvas4").getContext("2d");
    }

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 300).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            var Filters = '';
            var FiltersApplied = '';
            var Filters1 = '';
            var FiltersApplied1 = '';
            for (var key in Data) {
                if (Data.hasOwnProperty(key)) {
                    if (Data[key] != 'All' && Data[key] != undefined && Data[key] != "0") {
                        if ((Filters.length) < 35) {
                            Filters = Filters + key + " : " + Data[key] + " , ";
                        }
                        else {
                            Filters1 = Filters1 + key + " : " + Data[key] + " , ";
                        }
                    }
                }
            }

            FiltersApplied = Filters.replace(/,\s*$/, "");
            FiltersApplied1 = Filters1.replace(/,\s*$/, "");

            var text = FiltersApplied;
            textX = 20;//Math.round((width - ctx.measureText(text).width) / 2),
            textY = height - 38;
            ctx.font = fontSize - 2 + "em sans-serif";
            ctx.fillStyle = '#818181';
            ctx.textBaseline = "bottom";
            ctx.fillText(text, textX, textY);

            var text1 = FiltersApplied1;
            textX = 20;//Math.round((width - ctx.measureText(text1).width) / 2),
            textY = height - 24;
            ctx.fillText(text1, textX, textY);
            ctx.save();
        }
    });

    window.myBarCanvas4 = new Chart(canvas4, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            tooltips: { enabled: true },
            hover: { mode: null },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true
                    , ticks: {
                        max: maxS1,
                        min: 0
                    }
                },
                {
                    display: true,
                    position: 'right'
                    , ticks: {
                        max: maxS2,//maxS2>maxOfYaxis?maxS2:maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: true
                    , ticks: {
                        max: maxS3,//maxS3 > maxOfYaxis ? maxS3 : maxOfYaxis,
                        min: 0
                    }
                },
                ]
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10
                    //,padding:0
                }
            },
            title: {
                display: true,
                text: 'Breakdown Trends',
                padding: 12
            },
            showTooltips: false,
            animation: {
                onComplete: function () {

                    if (MaxOfs1 < Limit) {//No of records will decide whether to show values on top of bar
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = '#000';
                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y);
                            });
                        });
                    }
                }
            }
        }
    });
}

function SuccessFaultTreeAnalysisChartData(JsonChartData) {

    var chartData = jQuery.parseJSON(JsonChartData);
    var s1 = [];
    var ticks = [];

    $.each(chartData.Table, function (key, value) {
        ticks.push(value["FaultCode"]);
        s1.push(parseFloat(value["FaultcodeCnt"]));
    });

    var color = Chart.helpers.color;
    var MaxOfs1 = s1.length;

    var maxS1 = Math.max.apply(Math, s1);

    var minS1 = Math.min.apply(Math, s1);

    var barChartData = {
        labels: ticks,
        datasets: [{
            label: 'Fault Code Count',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: s1
        },
        ]

    };

    var canvas6 = document.getElementById("canvas6").getContext("2d");
    if (window.myBarCanvas4 != null) {
        var delCanvas = document.getElementById('Div6');
        delCanvas.innerHTML = '&nbsp;';
        $('#Div6').append('<canvas id="canvas6" height="150px" width="200px"></canvas>');
        var newContext = $('#canvas6').get(0).getContext('2d');
        canvas6 = document.getElementById("canvas6").getContext("2d");
    }
    window.myBarCanvas6 = new Chart(canvas6, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            tooltips: { enabled: false },
            hover: { mode: null },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                }
            },
            title: {
                display: true,
                text: 'Fault Tree Analysis',
                padding: 12
            },
            showTooltips: false,
            animation: {
                onComplete: function () {
                    if (MaxOfs1 < Limit) {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        }
    });
}

function SuccessDowntimeAnalysisChartData(JsonChartData) {
    var chartData = jQuery.parseJSON(JsonChartData);
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var s4 = [];
    var ticks = [];

    $.each(chartData.Table, function (key, value) {
        ticks.push(value["year"] + ':' + value["month"]);
        s1.push(parseFloat(value["Downtimelessthan1HrCnt"]));
        s2.push(parseFloat(value["Downtimebet1To3HrsCnt"]));
        s3.push(parseFloat(value["Downtimebet3To24HrsCnt"]));
        s4.push(parseFloat(value["DowntimeGreaterthan24HrsCnt"]));
    });
    var color = Chart.helpers.color;
    var MaxOfs1 = s1.length;
    var MaxOfs2 = s2.length;
    var MaxOfs3 = s3.length;
    var MaxOfs4 = s4.length;

    var maxOS1 = Math.max.apply(Math, s1);
    var maxS1 = (Math.ceil(maxOS1 / 10) * 10);
    var maxOS2 = Math.max.apply(Math, s2);
    var maxS2 = (Math.ceil(maxOS2 / 10) * 10);
    var maxOS3 = Math.max.apply(Math, s3);
    var maxS3 = (Math.ceil(maxOS3 / 10) * 10);
    var maxOS4 = Math.max.apply(Math, s4);
    var maxS4 = (Math.ceil(maxOS4 / 10) * 10);
    var arr = [maxS1, maxS2, maxS3, maxS4];
    var maxOfYaxis = Math.max.apply(Math, arr);

    var barChartData = {
        labels: ticks,
        datasets: [{
            label: '<1 Hr',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: s1
        }, {
            label: '1-3 Hrs',
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: s2
        },
         {
             label: '3-24 Hrs',
             backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
             borderColor: window.chartColors.orange,
             borderWidth: 1,
             data: s3
         },
          {
              label: '>24 Hrs',
              backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
              borderColor: window.chartColors.purple,
              borderWidth: 1,
              data: s4
          },

        ]

    };

    var canvas7 = document.getElementById("canvas7").getContext("2d");
    if (window.myBarCanvas7 != null) {
        var delCanvas = document.getElementById('Div7');
        delCanvas.innerHTML = '&nbsp;';
        $('#Div7').append('<canvas id="canvas7" height="150px" width="200px"></canvas>');
        var newContext = $('#canvas7').get(0).getContext('2d');
        canvas7 = document.getElementById("canvas7").getContext("2d");
    }
    window.myBarCanvas7 = new Chart(canvas7, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            tooltips: { enabled: false },
            hover: { mode: null },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                {
                    display: false,
                    ticks: {
                        max: maxOfYaxis,
                        min: 0
                    }
                },
                 {
                     display: false,
                     ticks: {
                         max: maxOfYaxis,
                         min: 0
                     }
                 },

                ]
            },
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 10,
                }
            },
            title: {
                display: true,
                text: 'Downtime Analysis',
                padding: 12
            },
            showTooltips: false,
            animation: {
                onComplete: function () {
                    if (MaxOfs1 < Limit) {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize - 3, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        }
    });
}

  
 
