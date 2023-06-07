var interval = 1000;
var PR_V = 0;
var state_c = 0;
var state_g = 0;
var state_e = 0;
var state_p=0;
var duty_cycle = 0;
var PWM1 = 0;

function generateCode() {
  PWM1 = document.getElementById("PWMF").value;
  DT1 = document.getElementById("DT").value;

  PR_V = (2000/PWM1) - 1;
  duty_cycle = ((DT1/100)*(PR_V+1)-1);

  var code_1 = "#include <pic18fregs.h>\n#include <delay.h>\n\n";
  code_1 += "#pragma config XINST=OFF\n#pragma config FOSC = INTOSCIO_EC\n#pragma config WDT = OFF\n#pragma config LVP = OFF\n\n";
  code_1 += "void delay(unsigned int val);\n\n";
  code_1 += "void main(void)\n{\n";
  code_1 += "    OSCCON=0x72;         /* set internal clock to 8MHz */\n";
  code_1 += "    TRISCbits.TRISC2=0;  /* Set CCP1 pin as output for PWM out */\n";
  code_1 += "    PR2 = "+ PR_V+ ";\n";
  code_1 += "    CCPR1L = 1;   /* load duty cycle */\n    T2CON=0;             /* no pre-scalar*/\n";
  code_1 += "    CCP1CON=0x0C;        /* set PWM mode*/\n    TMR2=0;\n";
  code_1 += "    T2CONbits.TMR2ON=1;  /* Turn ON Timer2 */\n";
  code_1 += "    while(1)\n    {\n";
  var code = "        CCPR1L =" + duty_cycle + ";   /* load duty cycle */"
  var code_2 = "    }\n"
  code_2 += "}\n"
  code_2 += "\n"
  code_2 += "void delay(unsigned int val)\n{\n"
  code_2 += "     unsigned int i,j;\n";
  code_2 += "        for(i=0;i<=val;i++)\n            for(j=0;j<165;j++);      /*This count Provide delay of 1 ms for 8MHz Frequency */\n"
  code_2 += "}"

  document.getElementById("code_1").value = code_1;
  document.getElementById("code").value = code;
  document.getElementById("code_2").value = code_2;
  alert("Code generated successfully!");
  state_g =1;
}

document.getElementById("compile-btn").addEventListener("click", async () => {
  let filename = (document.getElementById("code_1").value + document.getElementById("code").value + document.getElementById("code_2").value) || "experiment_2";
  const response = await fetch("http://192.168.1.45:8081/compile", {
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
  req.open("GET", "http://192.168.1.45:8081/execute", true);
  req.responseType = "";
  req.onload = function (event) {
    if (req.status != 200) return;
    var blob = JSON.parse(req.responseText);
    duty_cycle = blob;
  }
  req.send();
  pause();
  state_e =1;
  state_p=0;
  // document.write(delayy);
});

function showSavedMessage() {
  if (state_c == 1)
  {
    alert("Clock has been set");
    state_c = 0;
  }
  else
  {
    alert("Please compile the code first");
  }
}


document.getElementById("download-code-btn").addEventListener("click", async () => {
  var req = new XMLHttpRequest();
  req.open("GET", "http://192.168.1.45:8081/download", true);
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
  req.open("GET", "http://192.168.1.45:8081/HEX", true);
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
  title: 'Voltages in Real Time',
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
  title: 'Average PWM Output',
  xaxis: {
    range: [0, 10],
    title: 'Time (in ms)'
  },
  yaxis: {
    range: [-0.2, 6.0],
    title: 'Pulse Volatge (in V)'
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
  if (time % 1 < (1)*((duty_cycle+1)/(PR_V+1))) {
    y = 5;

  } else {
    
    y = 0;
  }
  y2 = 5 * ((duty_cycle+1)/(PR_V+1));
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

