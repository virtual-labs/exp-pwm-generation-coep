
//function mainPage1(){
	$("#main-div-conf").html('');	
     $("#canvas-div").html('');	
 //    $("#canvas-div1").html('');
      $("#centerText1").html('DIAGRAM');
      $("#centerText2").html('CONFIGURATION');
// 			var htm = '<center><img src="images/chipImg.png" class="img-fluid" style="width: 80%;" ></center>'
//	    $("#canvas-div1").html(htm);
	
 
var selection ='<div class="row selectConf" >'
	+ '<div class="col-sm-1">'
	+ '</div>'
//	+ '<div class="col-sm-5" id="ledSelect" >'
//	+ '<label class="labelstyle"></label>'
//	+ '</div>'
	+ '<div class="col-sm-10  textConfigNote">'
    + '<strong class=""><center><b>Clock Frequency (MHz) : 8MHz </b> </center></strong>'
	+ '</div>'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '</div>' 
	
//	+'<div class="row selectConf" >'
//	+ '<div class="col-sm-1">'
//	+ '</div>'
////	+ '<div class="col-sm-5" id="ledSelect" >'
////	+ '<label class="labelstyle"></label>'
////	+ '</div>'
//	+ '<div class="col-sm-10 blink_text">'
//    + '<strong><center><b>Pin Name : RC2 </b> </center></strong>'
//	+ '</div>'
//	+ '<div class="col-sm-1">'
//	+ '</div>'
//	+ '</div>'
	
	+'<div class="row selectConf" >'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '<div class="col-sm-5" id="OpinSelection" >'
	+ '<label class="labelstyle"><center>Select Output Pin : </center></label>'
	+ '</div>'
	+ '<div class="col-sm-5">'
	+ '<select  class="form-control selectConf " id="outputPinName"  style="height:auto;" >'
	+ '<option value="0">--- Select Output Pin ---</option>'
//	+ '<option value="1" name="RD0" disabled style="background-color:#d7f5ec;" >RC1</option>'
	+ '<option value="2" name="RD1">RC2</option>'
	+ '</select>'
	+ '</div>'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '</div>'
	
//	$('#outputPinName').children(":selected").css("background-color","#f7dddd");
	
	+'<div class="row selectConf" >'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '<div class="col-sm-5" id="ptimerRow" >'
	+ '<label class="labelstyle">Select PWM Period value (mS) : </label>'
	+ '</div>'
	+ '<div class="col-sm-5">'
	+ '<select  class="form-control selectConf" id="pVal"  style="height:auto;" disabled >'
	+ '<option value="0">--- Select PWM Period value---</option>'
	+ '<option value="1000" >1ms</option>'
	+ '<option value="2000" >2ms</option>'
	+ '<option value="250" >250ms</option>'
	+ '<option value="500" >500 ms</option>'
//	+ '<option value="100" >100 ms</option>'
	+ '</select>'
	+ '</div>'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '</div>'
	
	+'<div class="row selectConf" >'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '<div class="col-sm-5" id="dutytimerRow" >'
	+ '<label class="labelstyle">Select Duty Cycle (10% - 100%) : </label>'
	+ '</div>'
	+ '<div class="col-sm-5">'
	+'<input type="number"  id="perdentageVal" placeholder="Enter Duty Cycle Value"style= 10px;width:100%;"  class=" form-control " disabled>'
	+ '</div>'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '</div>'
	
	
	
	+ '<div class="row selectConf" >'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '<div class="col-sm-5" id="ledSelect" >'
	+ '<label class="labelstyle">Select LED Configuration :</label>'
	+ '</div>'
	+ '<div class="col-sm-5">'
	+ '<select  class="form-control selectConf" id="ledtype"  style="height:auto;" disabled>'
	+ '<option value="0">--- Select Pin ---</option>'
	+ '<option value="1" >Current Sourcing</option>'
//	+ '<option value="2" >Current Sinking</option>'
	+ '</select>'
	+ '</div>'
	+ '<div class="col-sm-1">'
	+ '</div>'
	+ '</div>'
	
	
	+ '<div class="row" selectConf>'
	+ '<div class="col-sm-3" id="buttonDiv">'
	+ '<button type="button" class="btn btn-danger btnStyle button button5" id="generateCode" data-toggle="modal" data-target="#myModal" disabled><b>GENERATE CODE</b></button>'
	+ '</div>'
	+ '<div class="col-sm-3" id="buttonDiv">'
	+ '<button type="button" class="btn btn-success btnStyle button button4" id="compileCode" data-toggle="modal" data-target="#myModal" disabled><b>COMPILE</b></button>'
	+ '</div>'
	+ '<div class="col-sm-3" id="buttonDiv">'
	+ '<button type="button" class="btn btn-success btnStyle button button4" id="executeCode" data-toggle="modal" data-target="#myModal" disabled><b>EXECUTE</b></button>'
	+ '</div>'
//	+ '<div class="col-sm-2" id="buttonDiv">'
//  +' <button type="button" class="btn btn-info btnStyle button button3" id="refresh" data-toggle="modal"><b>REFRESH</b></button>'
//	+ '</div>'
	+ '<div class="col-sm-3" id="buttonDiv">'
	+ '<button type="button" class="btn btn-primary btnStyle button button2" id="downloadCode" data-toggle="modal" disabled><i class="fa fa-download"></i> <b>DOWNLOAD</b></button>'
	+ '</div>'
	+ '</div>'
	
	+ '<div class="row  selectConf" id="codeview"   hidden>'
    + '<div class="col-sm-12" >'
    + '<p id="demo" style="margin-top:10px ;border-style: double;"></p>'
    + '</div>'
    + '</div>'
    
    + '<div class="row  selectConf" id="errorview"   hidden>'
    + '<div class="col-sm-12" >'
    + '<p id="errordemo" style="margin-top:10px ; border-style: double;"></p>'
    + '</div>'
    + '</div>'
	
	+ ' <!-- Modal -->'
	+ '<div class="modal fade" id="myModal" role="dialog">'
	+ ' <div class="modal-dialog modal-md">'
	+ '    <div class="modal-content">'
	+ '     <div class="modal-header">'

	+ '       <h4 class="modal-title">Message box</h4>'
	+ '       <button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
	+ '     </div>'
	+ '     <div class="modal-body">'
	+ '       <p id="modelMsg"></p>'
	+ '     </div>'
	+ '     <div class="modal-footer">'
	+ '       <button type="button" class="btn btn-danger" id = "nextPage" data-dismiss="modal" >Okay</button>'
	+ '     </div>'
	+ '   </div>'
	+ ' </div>'
	+ '</div>'
	+ '</div>'
	+ '</div>'
	+ ' </div>'
	
	$("#main-div-conf").html(selection);




var oPinSelect;
var pValSelect;
var dValSelect;
var sValSelect;
var ledSelect;


var id=0;
var outputPinVal;
var periodVal;
var dCycleVal;
var switchVal;
var ledTypeVAl;


	$("#outputPinName").change(function(){
		$("body").css("padding","0px 0px 0px 0px");	
		outputPinVal = $("#outputPinName").val();
		if(outputPinVal<=0){
			alert("Select Output Pin.");
		}else{
//			$("#outputPinName").children(":selected").css("background-color","#f7dddd")		  
		  $("#pVal").prop("disabled",false);			  
 		  $("#outputPinName").prop("disabled",true);
		}
		
		
	});
	
	$("#pVal").change(function(){
		$("body").css("padding","0px 0px 0px 0px");	
		periodVal = $("#pVal").val();
		console.log("periodVal ="+periodVal);
		if(periodVal<=0){
			alert("Select period (PR2 Value).");
		}else{		  
		  $("#perdentageVal").prop("disabled",false);			  
 		  $("#pVal").prop("disabled",true);
		}		
	});
	

	$("#perdentageVal").change(function(){
		$("body").css("padding","0px 0px 0px 0px");	
		dCycleVal=$("#perdentageVal").val();
		if(dCycleVal==""){
			alert("Enter numeric value");
		}else{
			dCycleVal=$("#perdentageVal").val();
			
			 if(dCycleVal>=10 && dCycleVal<=100){					  
 		  		$("#ledtype").prop("disabled",false);		  			  
 		  		$("#perdentageVal").prop("disabled",true);
			}else{
				alert("Enter the value of duty cycle in the range of 10% to 100%");			
			}
	 }	
	});
	

$("#ledtype").change(function(){
	$("body").css("padding","0px 0px 0px 0px");	
		ledTypeVAl = $("#ledtype").val(); 
		if(ledTypeVAl<=0){
//			$("#modelMsg").html("<b class='boldTextRed'>Select Appropraite Pin.</b>");
			alert("Select LED Connection Type.");
		}else{	
		  $("#generateCode").prop("disabled",false);
		  $("#compileCode").prop("disabled",false);
		  $("#executeCode").prop("disabled",false);
		  $("#downloadCode").prop("disabled",false);	  
		  $("#ledtype").prop("disabled",true);			  
// 		  toastr.success("Correct Answer");		 
		}
		
})


var codeWindow =  '<div class="row  selectConf" id="codeview" hidden >'
			    + '<div class="col-sm-12" >'
			    + '<p id="demo" style="margin-top:10px ;border-style: double;"></p>'
			    + '</div>'
			    + '</div>'
			    
			    + '<div class="row  selectConf" id="errorview"  hidden >'
			    + '<div class="col-sm-12" >'
			    + '<p id="errordemo" style="margin-top:10px ; border-style: double;"></p>'
			    + '</div>'
			    + '</div>'
			
			
				+ ' <!-- Modal -->'
				+ '<div class="modal fade" id="myModal" role="dialog">'
				+ ' <div class="modal-dialog modal-md">'
				+ '    <div class="modal-content">'
				+ '     <div class="modal-header">'
			
				+ '       <h4 class="modal-title">Message box</h4>'
				+ '       <button type="button" class="close" data-dismiss="modal" style="color:#fff;">&times;</button>'
				+ '     </div>'
				+ '     <div class="modal-body">'
				+ '       <p id="modelMsg"></p>'
				+ '     </div>'
				+ '     <div class="modal-footer">'
				+ '       <button type="button" class="btn btn-danger" id = "nextPage" data-dismiss="modal" >Okay</button>'
				+ '     </div>'
				+ '   </div>'
				+ ' </div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ ' </div>'

	var flag = false;


$("#generateCode").click(function () {	
	var Pwer3Val = Math.pow(10,-6);
console.log("Pwer3Val = "+Pwer3Val);

var ptimeVal= parseInt(periodVal);
console.log(ptimeVal);
var PR2ValTop=ptimeVal*Pwer3Val;
console.log("PR2ValTop = "+PR2ValTop);

var Pwer6Val = Math.pow(10,-6);
console.log("Pwer6Val = "+Pwer6Val);

var PR2ValBottom=4*0.125*Pwer6Val*16;
console.log("PR2ValBottom = "+PR2ValBottom);

var PR2Val=PR2ValTop/PR2ValBottom;
console.log("PR2Val = "+PR2Val);

var PR2ValCorr=PR2Val-1;
var PR2ValCorrfinal=Math.round(PR2ValCorr);
console.log("PR2ValCorr = "+PR2ValCorr+" ,PR2ValCorrfinal = "+PR2ValCorrfinal);

var dCycleValue5=parseInt(dCycleVal);
console.log("dCycleValue5="+dCycleValue5);

var calculateDutycycle=dCycleValue5/100;
console.log("calculateDutycycle="+calculateDutycycle);

var codeDutyCval= calculateDutycycle*PR2ValCorrfinal;
var codeDutyCvalCorr=Math.round(codeDutyCval)  //.toFixed(2);
console.log("codeDutyCval="+codeDutyCval+", codeDutyCvalCorr= "+codeDutyCvalCorr);


	$("#modelMsg").html("<b class='boldTextGreen'>Code Generated Successfully.</b>");
	flag=true;	
	
	$("#codeview").prop("hidden",false);
	var currentdate = new Date(); 
    var datetime = "Date: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " Time "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	var a ='<p>'+datetime+'</p><br><br>'	
		    +'<p class="codeheaderfile">#include&#60;pic18fregs.h&#62; <br>#include&#60;delay.h&#62; </p>'
			+'<p>#pragma config XINST=OFF </p>'
			+'<p>#pragma config FOSC = INTOSCIO_EC </p>'
			+'<p>#pragma config WDT = OFF </p>'
			+'<p>#pragma config LVP = OFF </p>'
			+'<p>void delay(unsigned int val); </p>'
			+'<p>void main(void) </p>'
			+'<p>{ </p>'
			+'<p>OSCCON=0x72;  &nbsp;&nbsp;       /* set internal clock to 8MHz */  </p>'
			+'<p>TRISCbits.TRISC2=0; &nbsp;&nbsp;  /* Set CCP1 pin as output for PWM out */  </p>'
//			+'<p>TRISDbits.<span class="greenCode">TRISC2</span></p>'
			+'<p><span class="greenCode">PR2 = '+PR2ValCorrfinal+'</span> ;  </p>'
			+'<p>CCPR1L = 1;  &nbsp;&nbsp; /* load duty cycle */  </p>'
			+'<p>T2CON=0;    &nbsp;&nbsp;         /* no pre-scalar*/  </p>'
			+'<p>CCP1CON=0x0C;  &nbsp;&nbsp;      /* set PWM mode*/   </p>'
			+'<p>TMR2=0;  </p>'
			+'<p>T2CONbits.TMR2ON=1; &nbsp;&nbsp; /* Turn ON Timer2 */  </p>'
			+'<p>while(1)  </p>'
			+'<p>{  </p>'
			+'<p><span class="greenCode">CCPR1L = '+codeDutyCvalCorr+'</span> ; &nbsp;&nbsp;/* load duty cycle */   </p>'
			+'<p>}  </p>'
			+'<p>}  </p>'
//			+'<p>void delay(unsigned int val)  </p>'
//			+'<p>{  </p>'
//			+'<p>unsigned int i,j ;  </p>'
//			+'<p>for(i=0;i<=val;i++)  </p>'
//			+'<p>for(j=0;j<165;j++);&nbsp;&nbsp;/*This count Provide delay of 1 ms for 8MHz Frequency */  </p>'
//			+'<p>}  </p>'
	

$("#demo").html(a);

$("#errorview").prop("hidden",false);
var b = '<b class="blink_text">_</b><br><br><br>'
$("#errordemo").html(b);




});

var compileflag=false;
$("#compileCode").click(function(){
	
	compileflag=true;
	if(flag==true){
		$("#modelMsg").html("<b class='boldTextGreen'>Check Terminal Window Below Code for Errors.</b>");
		var b1 = '<b>Program Compiled Successfully.</b><br><br><br>'
		$("#errordemo").html(b1);
	}else{
		$("#modelMsg").html("<b class='boldTextGreen'>Please Generate The Code First.</b>");
	}
});
 

$("#executeCode").click(function () {
	if(compileflag==true){
		$("#modelMsg").html("<b class='boldTextGreen'>Code Executed Successfully.</b>");
			
			pValSelect= $("#pVal").val();
			dValSelect= $("#perdentageVal").val();
			ledSelect= $("#ledtype").val();
			$("#canvas-div").html('');
			$("#canvas-div1").html('');
			$("#plot").prop("hidden",false);
			mimic(pValSelect,dValSelect,ledSelect);
    
	}else{
//		mimic(pValSelect,dValSelect,ledSelect);
		$("#modelMsg").html("<b class='boldTextGreen'>Please Compile The Code First</b>");
	}
	
	
 
});

  var doc = new jsPDF();
	var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};
   

$("#downloadCode").click(function () {
	 if(flag==true){
			doc.fromHTML($('#demo').html(), 15, 15, {
        	'width': 170,
            'elementHandlers': specialElementHandlers
    		});
    		doc.save('sourcecode.pdf');
//			$("#modelMsg").html("<b class='boldTextGreen'>Download Code File Successfully.</b>");	
	}else{
//		$("#modelMsg").html("<b class='boldTextGreen'>Please Generate The Code First and Then You Can Download Code File.</b>");
		alert("Please Generate The Code First and Then You Can Download Code File.")
	}

 
});



//}
