$(document).ready(function () {

    $('#Sheet').hide();
    $('#TablesButton').hide();
    populateDatabaseLists();
    $('#lastSubmit').hide();
    $('#vr').hide();
    var sourcefile='';
    var destDB='';
    var sourceSheet='';
    var destTable = ''
    var mode='';

    $(document).on('click', '#list li', function(event)
    {
        sourcefile = $(this).text();
        makeAjaxCallSDB(sourcefile);
        $('#selectdb').prop('disabled','true');
        $('#selectdb').css("background-color","green");
        $('#selectdb').text(sourcefile);
    });

    $(document).on('click','#Sheet li', function(){
        sourceSheet = $(this).text();
        $('#SheetsButton').prop('disabled','true');
        $('#SheetsButton').css("background-color","green");
        $('#SheetsButton').text(sourceSheet);
    });    

    $(document).on('click','#Table li', function(){
        destTable = $(this).text();
        $('#TablesButton').prop('disabled','true');
        $('#TablesButton').css("background-color","green");
        $('#TablesButton').text(destTable);
    });

    $(document).on('change','#myForm input', function() {
        mode = $(this).parent().text();
        $('#myForm input:radio').prop('disabled','true');
    });

    $(document).on('click','#list2 li', function(){
        destDB = $(this).text();
        makeAjaxDest(destDB);
        $('#destDB').prop('disabled','true');
        $('#destDB').css("background-color","green");
        $('#destDB').text(destDB);
    });

    $(document).on('click','#SubButton',function(){

        //if(!(sourcefile.length==0 || sourceSheet.length==0 || mode.length==0 || destDB.length==0))
           // makeCompleteAjax(sourcefile,sourceSheet,mode,destDB);
        //else
            //alert('The following fields are empty :\n\n'+(sourcefile=='' ? 'Source Database\n': '')+(sourceSheet=='' ? 'Source Database\'s Table\n':'')+(mode=='' ? 'Mode of Insertion\n':'')+(destDB=='' ? 'Destination Database\n':'')+'');
    $.post("getColumns.php",{sheet : sourceSheet, file : sourcefile},function(data){
        alert(data);
        var start_li = '<li><a>'
        var end_li   = '</a></li>';
        data = JSON.parse(data);
           var start = "<option>"
        var end = "</option>";
    

    $.post("getDBColumns.php",{DB : destDB, Tb : destTable},function(data2){
        
        data2 = JSON.parse(data2);
        
        str = "";
        for(var j = 0;j<data.length;j++)
        {
            str += start +data[j]+end;
        }       
        
        var stringo = "";
        for(var k = 0;k<data2.length; k++)
        {

            stringo +=""+data2[k] + "  :  <select id =\""+k+"\">"+
                                    str+
                                "</select>";
        }
        
        $("#afterSub").append(stringo);        
        alert(stringo);
    })



    //$("#afterSub").append(stringo);

    });
    });

    

});

$(document).on("click","#afterSub > select > option",function(){
    alert($(this).html());
    alert($(this).parent().prop("id"));
   //alert('you clicked on button #' + clickedBtnID);
})

function makeAjaxDest(dest)
{
    $.post("HandleInputs.php",{source : dest},function(data){
        var start_li = '<li><a>'
        var end_li   = '</a></li>';
        var opts = data.split(' ');
        var stringo = "";
        for(var i= 0;i<opts.length;i++)
        {
            stringo += start_li + opts[i] + end_li;

        }
        $("#Table ul").append(stringo);
    });
    $('#TablesButton').show();   
}

function populateDatabaseLists()
{
    var start_li = '<li><a>';
    var end_li   = '</a></li>';
    var output = "";
    $.ajax({
        url:'Databases.php',
        type: 'POST',
    }).done(function(data) {console.log(data)})
      .fail(function(data) {alert("error");})
      .success(function(data){
        var recievedData = JSON.parse(data);
        for(var i =0;i<recievedData.length;i++){
            if (recievedData[i] != "cdcol" && recievedData[i] != "information_schema" && recievedData[i] != "mysql" && recievedData[i] != "performance_schema" && recievedData[i] != "phpmyadmin" && recievedData[i] != "test" && recievedData[i] != "test" && recievedData[i] != "webauth")
            output += start_li+recievedData[i]+end_li;
        }

        $("#list2 ul").append(output);

      })
      output = "";
      $.ajax({
        url:'Excels.php',
        type: 'POST',
    }).done(function(data) {console.log(data)})
      .fail(function(data) {alert("error");})
      .success(function(data){
        var recievedData = JSON.parse(data);
        var outp = "";
        for(var i =0;i<recievedData.length;i++){
            outp += start_li+recievedData[i]+end_li;
        }

        $("#list ul").append(outp);
      })
}

function makeCompleteAjax(sDB,sTable,md,dDB)
{
    //Establish connection to php script
    $.ajax({
        url: 'FILE1.php',
        type: 'POST',
        data: {
            sourcefile    : sDB,
            sourceSheet : sTable,
            mode        : md,
            destDB      : dDB
            }
    }).done(function(data) { console.log(data); })
        .fail(function() { alert("error");})
        .always(function(data)
        {		
            var span = $('#resultpic');
            if (data.toString().toLowerCase() == "success")
            {
                span.addClass('glyphicon-ok')
                $('#vr').show();
                $('#ICON').html("<h2 style='color: #3498db;'><strong><u>MESSAGE</u></strong><h2> <br> The Data was successfully " + (md == "Overwrite" ? "overwritten" : "appended") +" with any additional columns filled with 0.");
            }
            else
            {
                span.addClass('glyphicon-remove');
                $('#vr').show();
                $('#ICON').html("<h2 style='color: #3498db;'><strong><u>MESSAGE</u></strong><h2> <br> There was no tables whose schema matched that of the destination db.");
            }
            $('#lastSubmit').show();
            $('html, body').animate({
                scrollTop: $("#lastContainer").offset().top
            }, 1000);
        }
        );
}

function makeAjaxCallSDB(sourcefile)
{
	$.post("GetSheet.php",{file : sourcefile},function(data){
        var start_li = '<li><a>'
        var end_li   = '</a></li>';
        var opts = data.split(' ');
        var stringout = "";
        var recievedData = JSON.parse(data);
        var out="";
        for(var i =0;i<recievedData.length;i++){
            out += start_li+recievedData[i]+end_li;
        }       
        $("#Sheet ul").append(out);
    });
 	$('#Sheet').show();   
}