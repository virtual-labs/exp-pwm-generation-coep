var interval = 1000;
var PR_V = 0;
var state_c = 0;
var state_g = 0;
var state_e = 0;
var state_p=0;
var VREF1 = 0;
var VIN1 = 0;
var CH1 = 0;
var bits = 0;

function generateCode() {
  VREF1 = document.getElementById("VREF").value;

  var code_1 = "#include <pic18fregs.h>\n#include <delay.h>\n\n";
  code_1 += "#pragma config XINST=OFF\n#pragma config FOSC = INTOSCIO_EC\n#pragma config WDT = OFF\n#pragma config LVP = OFF\n\n";
  code_1 += "#define VREF " + VREF1  + "\n#define LED_TRIS_Output TRISDbits\n#define LED_LAT_Output LATDbits\n\n";
  code_1 += "void ADC_init(void);\nint ADC_read(int channel);\n\n";
  code_1 += "void ADC_Init()\n{   \n";
  code_1 += "    TRISA = 0xFF;	/* Set as input port */\n    ADCON1 = 0x0E;	/* Ref vtg is VDD and Configure pin as analog pin */\n";
  code_1 += "    ADCON2 = 0x92;	/* Right Justified, 4Tad and Fosc/32. */\n    ADRESH=0;		/* Flush ADC output Register */\n";
  code_1 += "    ADRESL=0;   \n}  \n\n";
  code_1 += "int ADC_Read(int channel)\n{\n    int digital;\n";
  code_1 += "    ADCON0 =(ADCON0 & 0b11000011)|((channel<<2) & 0b00111100);  \n    ADCON0 |= ((1<<ADCON0bits.ADON)|(1<< ADCON0bits.GO));\n";
  code_1 += "    while(ADCON0bits.GO_NOT_DONE==1);\n    digital = (ADRESH*256) | (ADRESL);\n    return(digital);\n}\n\n";
  code_1 += "void main(void)\n{\n    float voltage;\n";
  code_1 += "    OSCCON=0x72;         /* set internal clock to 8MHz */\n";
  code_1 += "    ADC_Init();\n    TRISD = 0;\n\n";
  code_1 += "    while(1)\n    {\n";
  code_1 += "        LATD= ADC_Read(0)*((float)VREF/(float)1023);\n";
  code_1 += "    }\n";
  code_1 += "}\n\n";




  document.getElementById("code_1").value = code_1;
  alert("Code generated successfully!");
  state_g =1;
}

document.getElementById("compile-btn").addEventListener("click", async () => {
  let filename = (document.getElementById("code_1").value) || "experiment_2";
  const response = await fetch("http://localhost:8080/compile", {
    method: "POST",
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/text'
    },
    body: filename,
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(errorMessage);
    alert("code has errors");
    return;
  }
  var hexFilePath = await response.text();
  document.getElementById("code_log").value = hexFilePath;
  console.log(hexFilePath);
  pause();
  state_c = 1;
  // display hex file path on the webpage
});

function showcompilemsg() {
    alert("Check Terminal Window below Simulation for errors")
}

document.getElementById("execute-btn").addEventListener("click", async () => {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/execute", true);
  req.responseType = "";
  req.onload = function (event) {
    if (req.status != 200) return;
    var blob = JSON.parse(req.responseText);
    bits = blob;
  }
  req.send();
  pause();
  state_e =1;
  state_p=0;
  VIN1 = document.getElementById("VIN").value;
  // document.write(delayy);
});

function showSavedMessage() {
    alert("Input Voltage has been updated");
    state_c = 0;
}


document.getElementById("download-code-btn").addEventListener("click", async () => {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/download", true);
  req.responseType = "blob";
  req.onload = function (event) {
    if (req.status != 200) return;
    var blob = req.response;
    var fileName = "exp_3_code.c" //if you have the fileName header available
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  req.send();
});

document.getElementById("download-op-btn").addEventListener("click", async () => {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:8080/HEX", true);
  req.responseType = "blob";
  req.onload = function (event) {
    if (req.status != 200) return;
    var blob = req.response;
    var fileName = "exp_3_code.hex" //if you have the fileName header available
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  req.send();
});


var images = [
  "exp_1_off.png",
  "exp_1_on.png"
];

var currentImage = 0;
var intervalId;
function updateImage() {
  var img = document.getElementById("myImage");
  img.src = images[currentImage];
  currentImage++;
  if (currentImage >= images.length) {
    currentImage = 0;
  }
}

function startImage() {
  updateImage();
  intervalId = setInterval(updateImage,interval);
}

function stopImage() {
  var img = document.getElementById("myImage");
  img.src = "exp_1_off.png";
  currentImage = 0;
  clearInterval(intervalId);
}

var data1 = [{
  x: [],
  y: [],
  mode: 'lines',
  line: {
    color: '#80CAF6'
  }
}];

var layout1 = {
  responsive: true,
  width: 900,
  height: 300,
  title: 'Input Voltage in ADC',
  xaxis: {
    range: [0, 10],
    title: 'Time (in ms)'
  },
  yaxis: {
    range: [-0.2, 6.0],
    title: 'Pulse Volatge (in V)'
  }
};

var data2 = [{
  x: [],
  y: [],
  mode: 'lines',
  line: {
    color: '#80CAF6'
  }
}];

var layout2 = {
  responsive: true,
  width: 900,
  height: 300,
  title: 'Digital Output generated as per ADC value',
  xaxis: {
    range: [0, 10],
    title: 'Time (in ms)'
  },
  yaxis: {
    range: [-1,bits+100],
    title: 'Digital Output'
  }
};

var interval_plot;
var time = 0;
function reset() {
    Plotly.deleteTraces('plot1',0);
    Plotly.deleteTraces('plot2',0);
      // Plotly.newPlot('plot', [],[]);
      var time = 0;
      state_p=1;
      
      stopImage();
  } 
function pause(){
  stopImage();
  clearInterval(interval_plot);
}

var dt = 0.01;
var y = 1;
state_p=0;
  Plotly.newPlot('plot1', data1, layout1);
  Plotly.newPlot('plot2', data2, layout2);

  function start(){
    if(state_e == 1 && state_p==0){
  startImage();
   interval_plot = setInterval(function() {
  time += dt;
  y = VIN1;
  y2 = parseInt(VIN1/VREF1 * bits);
  Plotly.extendTraces('plot1', {x: [[time]], y: [[y]]}, [0]);
  Plotly.extendTraces('plot2', {x: [[time]], y: [[y2]]}, [0]);
  if (time > 10) {
    Plotly.relayout('plot1', {
      xaxis: {
        range: [time-10, time]
      }
    });
    Plotly.relayout('plot2', {
      xaxis: {
        range: [time-10, time]
      }
    });
  }
}, dt*1000);
start_e =0;
}
else{
  alert("Please excute the code in simulation")
}
}

