from app.algoritmo import huffman, arvore_json
from flask import Flask,request,jsonify,render_template 
import os
from flask_cors import CORS

style_path=os.path.join(os.path.dirname(__file__),'../../frontend/','templates')
static_path=os.path.join(os.path.dirname(__file__),'../../frontend/','static')

app=Flask("__name__",template_folder=style_path,static_folder=static_path)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/huffman', methods=['GET','POST'])
def huffmanR():
    if request.method =='POST':
        data=request.get_json()
        texto=data["text"]
        raiz=huffman(texto)
        grafo=arvore_json(raiz)
        return jsonify(grafo)
    

CORS(app)