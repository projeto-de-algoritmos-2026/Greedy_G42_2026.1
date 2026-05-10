from app.algoritmo import huffman, arvore_json
from flask import Flask,request,jsonify,render_template 
from flask_cors import CORS


app=Flask("__name__")



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