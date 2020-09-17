from flask import request
from flask import abort
from flask import Flask, jsonify
from flask import make_response
from flask_cors import CORS, cross_origin
from filemanagement import read_file
from algorithms import orderMethod
from time import time, sleep
import json


unordered = []
ordered = []   
app = Flask(__name__)
CORS(app)

about = {
        'author': u'Gared',
        'methods': u'Insert, Bubble, Ramdom'
        }

@app.route('/', methods=['GET'])
def get_tasks():
    return jsonify({'about': about})

@app.route('/', methods=['POST'])
def create_task():
    global orderMethod, unordered
    jsonpost = json.loads(request.data)

    if 'file' in jsonpost:
        start = time()
        print('... leyendo %s'%(jsonpost['file']))
        unordered = read_file(jsonpost['file'])
        end = time()
        elapsed = round(end - start, 3)
        message = 'Archivo con !<%d muestras!> cargadas con exito'%(len(unordered))
        message = message.replace('!<','<span class="has-text-info">')
        message = message.replace('!>','</span class="has-text-info">')
        return jsonify({'message': message, 'time':elapsed, 'samples': unordered[:100]})
    if 'method' in jsonpost:
        method = jsonpost['method']
        samples = int(jsonpost['samples'])
        start = time()
        print('... resolviendo %d muestras con el metodo %s'%(samples, method))
        ordered = orderMethod(method, unordered, samples)
        end = time()
        elapsed = round(end - start, 3)
        message = '!<%s muestras!> ordenadas en !<%2.3f sec!>, con el metodo !<%s!>.'%(samples, elapsed, method)
        message = message.replace('!<','<span class="has-text-info">')
        message = message.replace('!>','</span class="has-text-info">')
        limit = min(1000, samples)
        return jsonify({'message': message, 'time': elapsed, 'ordered': ordered[:limit], 'unordered': unordered[:limit] }) 
    
    return jsonify({'error': 'Not found'}) 
if __name__ == '__main__':
    app.run(debug=True)

