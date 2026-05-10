from app.algoritmo import huffman, arvore_json,codificado,codificar_texto,diferenca
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

@app.route('/codificado', methods=['GET','POST'])
def codificar():
    if request.method =='POST':
        data=request.get_json()
        texto=data["text"]
        raiz=huffman(texto)
        codigo=codificado(raiz)
        text_cod=codificar_texto(texto,codigo)
        return jsonify({"texto_cod": text_cod})

@app.route('/diferenca', methods=['GET','POST'])
def diff():
    if request.method =='POST':
        data=request.get_json()
        texto=data["text"]
        raiz=huffman(texto)
        codigo=codificado(raiz)
        text_cod=codificar_texto(texto,codigo)
        diff=diferenca(text_cod,texto)
        return jsonify(diff)

CORS(app)