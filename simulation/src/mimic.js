

$('#canvas-div').removeAttr('width');
	$('#canvas-div').removeAttr('height');
	var w =660;
	var h = 550;

	var width = $(window).width();

	if ($(window).width() < 500) {
		width = $(this).width();
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	} else {
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	}

var x=100;
var y=160;	

//var Ledcircle = paper.circle(0, 0, 0); ;
//var resetimg=paper.image("images/reset.png",x+120,y-150,100, 50);

function mimic(pValSelect,dValSelect,ledSelect){
//	$("#main-div-conf").html('');	
    $("#canvas-div").html('');
//    $("#canvas-div").html('<button id="checkBtn" class="btn btn-primary" style="margin-left:50px; margin-top:50px; "><b>Check Connection</b></button>');
    			
//    $("#checkBtn").prop('hidden',false);	
    $("#centerText1").html('MIMIC');
    $("#centerText2").html('CONFIGURATION');
    $('#canvas-div').removeAttr('width');
	$('#canvas-div').removeAttr('height');
	var w =660;
	var h = 550;
	
	var width = $(window).width();

	if ($(window).width() < 500) {
		width = $(this).width();
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	} else {
		paper = new Raphael(document.getElementById('canvas-div'), '100%', '100%');
		paper.setViewBox(0, 0, w, h, true);
		paper.setSize('100%', '100%');
	}

var x=100;
var y=160;	

var pinVal=3;
var periodTimerValue2=parseInt(pValSelect);
var periodTimerValue1=periodTimerValue2/1000;
var cycleValue1=parseInt(dValSelect);		
//console.log(periodTimerValue1+"......"+cycleValue1);
		

var remaingpercentVal=100-cycleValue1;
var remaincalculate1=remaingpercentVal/100;
//console.log("remaincalculate1 = "+remaincalculate1);

var calculate1=cycleValue1/100;
//console.log("calculate1 = "+calculate1);

var addpercent=remaincalculate1+calculate1;
//console.log("addpercent = "+addpercent);


var calculate2Ans=calculate1*periodTimerValue1;
//console.log("calculate2Ans = "+calculate2Ans);

var interval_plot1=periodTimerValue1;
var onTime1=(periodTimerValue1*(cycleValue1/100));
//remaincalculate1;
var offTime1= periodTimerValue1-onTime1;
//calculate1;
var onTime11=onTime1+offTime1;

var checkStatus=paper.image("images/checkBtn1.png",x-90,y-150,200, 50);
var resetimg=paper.image("images/resetconnectioPreview.png",x+240,y-150,190, 50);
var runimg=paper.image("images/runPreview.png",x+120,y-150,110, 50);
var microcontroller=paper.image("images/chipImg.png",x-40,y+40,400, 300).rotate(1);

var Ledcircle=paper.circle(x+228, y-21, 35);
var inputpinName=0;

var diodSelection=1;
//Math.floor(Math.random() * 2);
//console.log("diodSelection = "+diodSelection);
var diode;
var anode;
var cathode;
if (diodSelection==0){
	diode=paper.image("images/diodeSymbolMirrorImg_preview.png",x+150,y-95,150, 110);
	anode=paper.circle(x+283, y-19, 5).attr({'fill':'#FF0000'});
	cathode=paper.circle(x+168, y-19, 5).attr({'fill':'#FF0000'});
}else{	
	diode=paper.image("images/diodeSymbol2.png",x+150,y-95,150, 110);
	anode=paper.circle(x+168, y-19, 5).attr({'fill':'#FF0000'});
	cathode=paper.circle(x+283, y-19, 5).attr({'fill':'#FF0000'});
}



var r=paper.image("images/resistorSymbol.png",x+350,y-45,120, 55); 
var connection_RtoG=paper.path("M"+(x+436)+" "+(y-17.5)+"l 40 0 l 0 52   ").attr({'stroke-width':2});
var ground= paper.image("images/ground.png",x+450,y+30,50, 21);

var Rcircle=paper.circle(x+363, y-17.5, 5).attr({'fill':'#FF0000'});
//var Ledcircle2=paper.circle(x+228, y-21, 35);

//var terminalRC1=paper.circle(x+206, y+61, 5).attr({'fill':'#FF0000'});
var terminalRC2=paper.circle(x+190, y+61, 5).attr({'fill':'#FF0000'});

var vssCircle=paper.circle(x+258, y+158, 5).attr({'fill':'#FF0000'});
//var ground_circle=paper.circle(x+325,y+263,5).attr({'fill':' #FF0000'});
var vddCircle=paper.circle(x+28, y+184, 5).attr({'fill':'#FF0000'});
var vdd= paper.image("images/VDD5V.png",x-76,y+115,55, 51);
var vddConnection=paper.path("M"+(x+24)+" "+(y+184)+"l -81 0 l 0 -22   ").attr({'stroke-width':3});

var ground= paper.image("images/ground.png",x+300,y+266,50, 21);
var groundConnection=paper.path("M"+(x+262)+" "+(y+158)+"l 64 0 l 0 112   ").attr({'stroke-width':3});

resetimg.click(function(){
	
//	$("#canvas-div").html('');
	$("#plot").html("");
	
	//reset();
	paper.clear();
	mimic(pValSelect,dValSelect,ledSelect)	;
	reset();
	$("#graphDiv").prop("hidden",true);
})


var crossCheckConnect=false;
var cathodFlag=0;
cathode.click(function(){
	cathodFlag=1;
//	console.log("cathodFlag"+cathodFlag);
	var cathode_connection_arr=[];	
	if(verifyRcircleConnect==true){
		toastr.info("Already Connected.");
	}else{
		if (diodSelection==0){
		if(RcircleFlag==1){	
//			crossCheckConnect=true;	
			cathode_connection_arr[0]=paper.path("M "+(x+360)+" "+(y-18.5)+ "l 0 0").attr({'stroke-width':3});			
			cathode_connection_arr[0].animate({path :"M"+(x+360)+" "+(y-18.5)+"l -30 -1   "},1000, function(){
			
			cathode_connection_arr[0]=paper.path("M "+(x+330)+" "+(y-18.5)+ "l 0 0").attr({'stroke-width':3});
			cathode_connection_arr[0].animate({path :"M"+(x+330)+" "+(y-18.5)+" l 0 -50 "},1000, function(){
			
			cathode_connection_arr[0]=paper.path("M "+(x+331)+" "+(y-68.5)+ "l 0 0").attr({'stroke-width':3});
			cathode_connection_arr[0].animate({path :"M"+(x+331)+" "+(y-68.5)+"l -164 0"},1000, function(){
			
			cathode_connection_arr[0]=paper.path("M "+(x+168)+" "+(y-68.5)+ "l 0 0").attr({'stroke-width':3});
			cathode_connection_arr[0].animate({path :"M"+(x+168)+" "+(y-68.5)+"l 0 46"},1000, function(){
				crossCheckConnect=true;	
			});
			});
			});	
			});	
		}
	}else{
		if(RcircleFlag==1){		
			cathode_connection_arr[0]=paper.path("M "+(x+360)+" "+(y-18.5)+ "l 0 0").attr({'stroke-width':3});			
			cathode_connection_arr[0].animate({path :"M"+(x+360)+" "+(y-18.5)+"l -73 -1 "},1000, function(){
//			console.log("cathode.click...... cathodFlag="+cathodFlag+", RcircleFlag ="+RcircleFlag);
			crossCheckConnect=true;	
			});	
		}
	}
	}
})

var verifyRcircleConnect=false;
var RcircleFlag=0;
Rcircle.click(function(){
	RcircleFlag=1;
//	console.log("RcircleFlag"+RcircleFlag);
	var cathode_connection_arr=[];	

	if( crossCheckConnect==true){
		toastr.info("Already Connected.");
	}else{
		if (diodSelection==0){
			if(cathodFlag==1){	
				
				cathode_connection_arr[0]=paper.path("M "+(x+168)+" "+(y-23.5)+ "l 0 0").attr({'stroke-width':3});
				cathode_connection_arr[0].animate({path :"M"+(x+168)+" "+(y-23.5)+"l 0 -46"},1000, function(){
						
				cathode_connection_arr[0]=paper.path("M "+(x+168)+" "+(y-68.5)+ "l 0 0").attr({'stroke-width':3});
				cathode_connection_arr[0].animate({path :"M"+(x+168)+" "+(y-68.5)+"l 164 0"},1000, function(){
				
				cathode_connection_arr[0]=paper.path("M "+(x+331)+" "+(y-68.5)+ "l 0 0").attr({'stroke-width':3});
				cathode_connection_arr[0].animate({path :"M"+(x+331)+" "+(y-68.5)+" l 0 50 "},1000, function(){
					
				cathode_connection_arr[0]=paper.path("M "+(x+330)+" "+(y-18.5)+ "l 0 0").attr({'stroke-width':3});			
				cathode_connection_arr[0].animate({path :"M"+(x+330)+" "+(y-18.5)+"l 30 1   "},1000, function(){
				verifyRcircleConnect=true;
				});
				});
				});	
				});	
			}
		}else{
			if(cathodFlag==1){
	//			console.log("Rcircle Click ....RcircleFlag="+RcircleFlag+" , cathodFlag="+cathodFlag);
				cathode_connection_arr[0]=paper.path("M "+(x+287)+" "+(y-18.5)+ "l 0 0").attr({'stroke-width':3});			
				cathode_connection_arr[0].animate({path :"M"+(x+287)+" "+(y-18.5)+"l 73 1 "},1000, function(){
					verifyRcircleConnect=true;
				});
			}
		}
	}

})

var verifyRC2Connection=false;
var c2Flag=0;
terminalRC2.click(function(){
	c2Flag=1;
	inputCheckFlag3=1;
	var StoT_connection_arr2=[];
	if(verifyAconnect==true){
		toastr.info("Already Connected.");
	}else{
		if(anodeflg==1){ 
					StoT_connection_arr2[0]=paper.path("M "+(x+168)+" "+(y-15)+ "l 0 0").attr({'stroke-width':3});			
					StoT_connection_arr2[0].animate({path :"M"+(x+168)+" "+(y-15)+"l 0 41"},500, function(){
					
					StoT_connection_arr2[0]=paper.path("M "+(x+168)+" "+(y+25)+ "l 0 0").attr({'stroke-width':3});			
					StoT_connection_arr2[0].animate({path :"M"+(x+168)+" "+(y+25)+"l 24 0"},500, function(){
					
					StoT_connection_arr2[0]=paper.path("M "+(x+190.1)+" "+(y+25)+ "l 0 0").attr({'stroke-width':3});			
					StoT_connection_arr2[0].animate({path :"M"+(x+190.1)+" "+(y+25)+"l 0 32"},500, function(){				
						verifyRC2Connection=true;
						inputpinName=3;
					});	
					});	
					});
			}
	}
});

var verifyAconnect=false;
var anodeflg=0;
anode.click(function(){
	anodeflg=1;
	anodeClick=true;
	var anode_connection_arr=[];
if(verifyRC2Connection	==true){
		toastr.info("Already Connected.");
}else{
	if(c2Flag==1){
			anode_connection_arr[0]=paper.path("M "+(x+190.1)+" "+(y+58)+ "l 0 0").attr({'stroke-width':3});			
			anode_connection_arr[0].animate({path :"M"+(x+190.1)+" "+(y+58)+"l 0 -35"},500, function(){
				
			anode_connection_arr[0]=paper.path("M "+(x+190.1)+" "+(y+25)+ "l 0 0").attr({'stroke-width':3});			
			anode_connection_arr[0].animate({path :"M"+(x+190.1)+" "+(y+25)+"l -24 0"},500, function(){
				
			anode_connection_arr[0]=paper.path("M "+(x+168)+" "+(y+25)+ "l 0 0").attr({'stroke-width':3});			
			anode_connection_arr[0].animate({path :"M"+(x+168)+" "+(y+25)+"l 0 -40"},500, function(){					
				verifyAconnect=true;	
				inputpinName=3;
				});	
				});	
				});
	}else{
//		alert("click on red circle of RC2 pin.")
	}
}	
})

var statusFlag=false;
var statusFlagValue=0; 
var checkStatusClickVal=0;
checkStatus.click(function(){	
	checkStatusClickVal=1;
	if(runingFlagValue==1){
					toastr.info("Connection status has already been checked.");
	}else{
	//	console.log("anodeflg"+anodeflg+", pinval="+pinVal+ ",pinname :" + pinName+", RcircleFlag="+RcircleFlag+", cathodFlag="+cathodFlag);
		if(anodeflg==1 && pinVal==inputpinName && RcircleFlag==1 && cathodFlag==1){
			statusFlag=true;
			statusFlagValue=1;
	//		$("#plot").html("");
	//		$("#plot").prop("hidden",false);
	//		start();
			toastr.success("Connection Established Successfully. Now Click on Run Button.");		
		}else if(RcircleFlag==0 && cathodFlag==0){
			toastr.warning("Establish Cathode Connection.");
		}else if(anodeflg!=1 && pinVal!=pinName){
			toastr.warning("Connect the pin.")
		}else{
			toastr.error("Wrong Connection. Please Try Again.");
		}
	}
});

var runingFlagValue=0;
runimg.click(function(){
	if(statusFlagValue==1){
		statusFlagValue=0;
		if(statusFlag==true){
			runingFlagValue=1;
			statusFlag=false;
	//		setInterval(toggleVisibility, timeVal*2);
	//		$("#plot").html("");
//			$("#graphDiv").prop("hidden",false);
			$("#plot").prop("hidden",false);
			start(interval_plot1,offTime1,onTime1);
	//		start();		
		}else{
			toastr.warning("Please check the connection status.");
		}
	}else if(checkStatusClickVal!=1){
		toastr.warning("Please check the connection status.");	//You have already run the circuit.
	}else{
		toastr.info("You have already clicked the Run button.");	//You have already run the circuit.
	}
});

}