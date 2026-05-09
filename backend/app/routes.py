from flask import Flask,request,jsonify,render_template 
from algoritmo import huffman,arvore_json

app=Flask("__name__")

@app.route('/')
def index():
    return "teste"

@app.route('/huffman', methods=['GET','POST'])
def huffman():
    if request.method =='POST':
        data=request.get_json()
        texto=data["text"]
        raiz=huffman(texto)
        grafo=arvore_json(raiz)
        return jsonify(grafo)