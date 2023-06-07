from flask import Flask
import os
from flask import jsonify,request,Response,send_from_directory
import json
import linecache as ln
import logging
from zipfile import ZipFile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/compile', methods= ["POST","OPTIONS"])
def index():
    delayy = ""
    code = request.get_data().decode()
    file = open("exp_3_code.c",'w')
    file.write(code)
    file.close()
    os.system("rm log.txt")
    os.system("sdcc --use-non-free -mpic16 -p18f4550 {}.c > log.txt 2>&1".format("exp_3_code"))
    log_txt = open("log.txt",'r')
    code_log = log_txt.read()
    log_txt.close()
    resp = Response(code_log)
    resp.headers['Access-Control-Allow-Headers'] = '*'
    return resp

@app.route('/execute', methods= ["GET"])
def index_2():
    delayy = ""
    file_read = open("exp_3_code.c",'r')
    delay_exp1 = ln.getline('exp_3_code.c',23)
    ln.clearcache()
    file_read.close()
    delay_exp1 = delay_exp1[(delay_exp1.find("=")):]
    for m in delay_exp1:
        if m.isdigit():
            delayy = delayy + m 
 
    print(delayy)

    resp = Response(delayy)
    
    # resp= send_from_directory(app.root_path,"temp2.hex",as_attachment=True)

    
    resp.headers['Access-Control-Allow-Headers'] = '*'
    return resp

@app.route('/download',methods=["GET"])
def index_3():

    # download zip file 
#    with ZipFile('exp_2_code.c', 'w') as zip_object:
#     Adding files that need to be zipped
#     zip_object.write('exp_2_code.c')   
    # zip_object.write('exp_2_code.cod')
    # zip_object.write('exp_2_code.lst')
    # zip_object.write('exp_2_code.o')
    # zip_object.write('exp_2_code.asm')
    # zip_object.write('exp_2_code.c')

    if(os.path.isfile("exp_3_code.c")):
        print("yes")
        resp= send_from_directory(app.root_path,"exp_3_code.c",as_attachment=True)
        # os.system("rm code.zip")
    else:
        resp = Response("zip file not found")
        return resp,400
    resp.headers['Access-Control-Allow-Headers'] = '*'
    

    return resp


@app.route('/HEX',methods=["GET"])
def index_4():

    if(os.path.isfile("exp_3_code.hex")):
        print("yes")
        resp= send_from_directory(app.root_path,"exp_3_code.hex",as_attachment=True)
        

        os.system("rm exp_3_code.hex")
        os.system("rm exp_3_code.cod")
        os.system("rm exp_3_code.lst")
        os.system("rm exp_3_code.o")
        os.system("rm exp_3_code.asm")
        os.system("rm exp_3_code.c")
        # os.system("rm code.zip")
    else:
        resp = Response("zip file not found")
        return resp,400
    resp.headers['Access-Control-Allow-Headers'] = '*'
    return resp
app.run(host= '192.168.1.45', port=8081,debug = True)
