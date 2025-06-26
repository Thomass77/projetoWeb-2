from flask import Blueprint, request, jsonify
from services import exercicio_service

exercicio_bp = Blueprint('exercicio_bp', __name__)

@exercicio_bp.route('/exercicios', methods=['GET'])
def get_exercicios():
    exercises = exercicio_service.get_all_exercises()
    if exercises is not None:
        return jsonify(exercises), 200
    return jsonify({'error': 'Erro ao buscar exercícios'}), 500

@exercicio_bp.route('/exercicios/<int:id>', methods=['GET'])
def get_exercicio(id):
    exercise = exercicio_service.get_exercise_by_id(id)
    if exercise:
        return jsonify(exercise), 200
    return jsonify({'error': 'Exercício não encontrado'}), 404

@exercicio_bp.route('/exercicios', methods=['POST'])
def create_exercicio():
    data = request.json
    exercise_id = exercicio_service.create_exercise(data)
    if exercise_id:
        return jsonify({'id': exercise_id, 'message': 'Exercício criado com sucesso'}), 201
    return jsonify({'error': 'Erro ao criar exercício'}), 500

@exercicio_bp.route('/exercicios/<int:id>', methods=['PUT'])
def update_exercicio(id):
    data = request.json
    if exercicio_service.update_exercise(id, data):
        return jsonify({'message': 'Exercício atualizado com sucesso'}), 200
    return jsonify({'error': 'Exercício não encontrado ou erro ao atualizar'}), 404

@exercicio_bp.route('/exercicios/<int:id>', methods=['DELETE'])
def delete_exercicio(id):
    if exercicio_service.delete_exercise(id):
        return jsonify({'message': 'Exercício deletado com sucesso'}), 200
    return jsonify({'error': 'Exercício não encontrado ou erro ao deletar'}), 404