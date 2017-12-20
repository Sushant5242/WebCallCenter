 function fnExcelReport(tableid) {
        
        var textRange; var j = 0;
        // var tab = this;

		var el = this;
        //tab = document.getElementById(tableid); // id of table
		tab = $('#' + tableid).dataTable();
       

        var tab_text = "<table border='1px'>";

        $.each($('#' + tableid).find('thead tr'), function(i, e){

            tab_text += "<tr>";  

                $.each($(e).find('th'), function(k, v) {

                    tab_text += "<th><b>" + $(v).text().trim() + "</b></th>";
                });

            tab_text += "</tr>";
        });

        $.each($('#' + tableid).dataTable().$('tr'), function(i, r){

            tab_text += "<tr>";  

                $.each($(r).find('td'), function(k, v) {

                    tab_text += "<td>" + $(v).text().trim() + "</td>";
                });

            tab_text += "</tr>";
        });
        $.each($('#' + tableid).find('tfoot tr'), function(i, e){

            tab_text += "<tr>";  

                $.each($(e).find('td'), function(k, v) {

                    tab_text += "<td><b>" + $(v).text().trim() + "</b></td>";
                });

            tab_text += "</tr>";
        });


/*        for (j = 0; j < $(tableid).dataTable().$('tr'); j++) {
                   tab_text = "<tr bgcolor='#87AFC6'>" + tab_text + ($(tableid).dataTable().$('tr')[j]).innerHTML + "</tr>";
            //tab_text=tab_text+"</tr>";
        }*/

        /*for (j = 0; j < tab.rows.length; j++) {
                   tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            //tab_text=tab_text+"</tr>";
        }*/

        
        // $(tab).dataTable().$('tr').each(function() {
        
         // tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
       
      //  });


        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Book1.xls");
        }
        else                 //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

        return (sa);
    }

function fnExcelReportaspx(tableid) {

     var textRange; var j = 0;
     // var tab = this;

     var el = this;
     //tab = document.getElementById(tableid); // id of table
     tab = $('#' + tableid);


     var tab_text = "<table border='1px'>";

     $.each($('#' + tableid).find('thead tr'), function (i, e) {

         tab_text += "<tr>";

         $.each($(e).find('th'), function (k, v) {

             tab_text += "<th><b>" + $(v).text().trim() + "</b></th>";
         });

         tab_text += "</tr>";
     });
     $.each($('#' + tableid).find('tbody tr'), function (i, e) {

         tab_text += "<tr>";
         $.each($(e).find('th'), function (k, v) {

             tab_text += "<th><b>" + $(v).text().trim() + "</b></th>";
         });
         $.each($(e).find('td'), function (k, v) {

             tab_text += "<td>" + $(v).text().trim() + "</td>";
         });

         tab_text += "</tr>";
     });
      
     $.each($('#' + tableid).find('tfoot tr'), function (i, e) {

         tab_text += "<tr>";

         $.each($(e).find('td'), function (k, v) {

             tab_text += "<td><b>" + $(v).text().trim() + "</b></td>";
         });

         tab_text += "</tr>";
     });


     /*        for (j = 0; j < $(tableid).dataTable().$('tr'); j++) {
                        tab_text = "<tr bgcolor='#87AFC6'>" + tab_text + ($(tableid).dataTable().$('tr')[j]).innerHTML + "</tr>";
                 //tab_text=tab_text+"</tr>";
             }*/

     /*for (j = 0; j < tab.rows.length; j++) {
                tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
         //tab_text=tab_text+"</tr>";
     }*/


     // $(tab).dataTable().$('tr').each(function() {

     // tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";

     //  });


     tab_text = tab_text + "</table>";
     tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
     tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
     tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

     var ua = window.navigator.userAgent;
     var msie = ua.indexOf("MSIE ");

     if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
     {
         txtArea1.document.open("txt/html", "replace");
         txtArea1.document.write(tab_text);
         txtArea1.document.close();
         txtArea1.focus();
         sa = txtArea1.document.execCommand("SaveAs", true, "Book1.xls");
     }
     else                 //other browser not tested on IE 11
         sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

     return (sa);
 }
