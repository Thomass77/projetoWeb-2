from flask import Flask
from flask_cors import CORS
from controllers.usuario_controller import usuario_bp
from controllers.treino_controller import treino_bp
from controllers.exercicio_controller import exercicio_bp


app = Flask(__name__)


CORS(app)


app.register_blueprint(usuario_bp, url_prefix='/api')
app.register_blueprint(treino_bp, url_prefix='/api')
app.register_blueprint(exercicio_bp, url_prefix='/api')

@app.route('/')
def index():
    return "Bem-vindo à API do Gym!"


if __name__ == '__main__':

    app.run(debug=True, port=5000)