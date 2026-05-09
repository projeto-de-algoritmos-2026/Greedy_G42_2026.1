from flask import Flask

app=Flask("__name__")

@app.route('/')
def index():
    pass

@app.route('/codificar', methods=['GET','POST'])
def codificar():
    pass